import Image from "next/image";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

async function getUserInfo(userId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getuserdata/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data.success ? data.user : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function adminReply(commentId, commentReply) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogcomment/comment-reply/admin-reply`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId, commentReply }),
      }
    );
    const data = await response.json();
    return data.success ? data : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function Comment({ comment }) {
  const [user, setUser] = useState(null);
  const [reply, setReply] = useState("");
  const [replying, setReplying] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = await getUserInfo(comment.userId);
      setUser(user);
    };
    fetchUserInfo();
    // eslint-disable-next-line
  }, [comment.userId]);

  const handleReply = async () => {
    try {
      setReplying(true);
      const response = await adminReply(comment._id, reply);
      if (response === null) {
        toast.error("Error", {
          description: "Something went wrong. Please try again later.",
        });
        return;
      }
      if (response.success) {
        comment.replies.push(response.reply);
        toast.success("Reply posted", {
          description: "Your reply has been posted.",
        });
        setReply("");
      } else {
        toast.error("Reply failed", {
          description: response.message,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setReplying(false);
    }
  };

  if (!user) return <p>Loading...</p>;

  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
  });

  return (
    <div className="flex flex-col gap-3 px-4 py-6 mb-5 border border-muted shadow-md rounded-xl">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={user.profilePicture}
            alt="profile pic"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-3">
            <h5 className="text-base font-bold">{user.name}</h5>
            <p className="text-sm text-muted-foreground">{timeAgo}</p>
          </div>
          <p className="text-sm leading-relaxed">{comment.comment}</p>
        </div>
      </div>
      {comment.replies.length > 0 && (
        <div className="mt-4 flex flex-col gap-4 pl-12">
          {comment.replies.map((reply) => (
            <div key={reply.createdAt} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={
                    reply.actionBy === "admin"
                      ? "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/priyanshu.png"
                      : user.profilePicture || "/default-avatar.png"
                  }
                  alt="profile pic"
                  width={28}
                  height={28}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <h5 className="text-sm font-semibold">
                    {reply.actionBy === "admin"
                      ? "Admin • Hey Sainty"
                      : user.name}
                  </h5>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(reply.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <p className="text-sm leading-relaxed mt-1 text-foreground">
                  {reply.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-col gap-3">
        <Textarea
          placeholder="Reply to this comment..."
          rows={2}
          className="text-lg rounded-xl border border-muted focus:ring-1 focus:ring-muted outline-none p-3"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
        <Button className="font-semibold rounded-lg px-4 py-2 w-full md:w-fit">
          Reply
        </Button>
      </div>
    </div>
  );
}
