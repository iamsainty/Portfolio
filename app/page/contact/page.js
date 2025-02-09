export default function Page() {
    return (
      <div className="w-full lg:w-3/5 mx-auto p-6">
        <h1 className="text-3xl lg:text-5xl font-extrabold my-10">Contact Me</h1>
  
        <p className="text-lg mb-8 leading-relaxed text-justify">
          I&apos;m always open to connecting with fellow developers, tech enthusiasts, and anyone who&apos;s interested in my work. Whether you have a question, feedback, or just want to say hello, feel free to reach out. I&apos;ll do my best to get back to you as soon as possible!
        </p>
  
        <h2 className="text-xl lg:text-3xl font-bold mt-10 mb-4">Contact Methods</h2>
        <ul className="list-disc pl-8 text-lg space-y-3 mt-4">
          <li className="leading-relaxed text-justify">
            <span className="font-semibold">Email -</span> You can email me directly at 
            <a href="mailto:ppriyanshuchaurasia@gmail.com" className="hover:text-muted-foreground "> ppriyanshuchaurasia@gmail.com</a>.
          </li>
          <li className="leading-relaxed text-justify">
            <span className="font-semibold">Instagram -</span> Connect with me on Instagram: 
            <a href="https://instagram.com/iam__sainty" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground "> @iam__sainty</a>.
          </li>
          <li className="leading-relaxed text-justify">
            <span className="font-semibold">Twitter (X) -</span> Follow me on Twitter for updates: 
            <a href="https://twitter.com/iam__sainty" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground "> @iam__sainty</a>.
          </li>
          <li className="leading-relaxed text-justify">
            <span className="font-semibold">LinkedIn -</span> Connect with me on LinkedIn: 
            <a href="https://linkedin.com/in/iamsainty" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground "> iamsainty</a>.
          </li>
        </ul>
  
        <h2 className="text-xl lg:text-3xl font-bold mt-10 mb-4">Why Get in Touch?</h2>
        <p className="text-lg mb-8 leading-relaxed text-justify">
          Whether you&apos;re looking for collaboration opportunities, have a question about my blog posts, or simply want to share your thoughts, I&apos;m happy to hear from you! Reach out via any of the above methods and I&apos;ll do my best to respond in a timely manner. Let&apos;s connect!
        </p>
      </div>
    );
  }
  