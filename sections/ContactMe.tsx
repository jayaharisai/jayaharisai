import Image from "next/image";
import styles from "@/styles/ContactMe.module.css";
import { PROFILE_DATA } from "@/data/profile";
import { asset } from "@/lib/basePath";

export default function ContactMe() {
  return (
    <section id="contact" className={styles.contactme}>
      {/* LEFT SIDE */}
      <div className={styles.contactmemessage}>
        <div className={styles.title}>Contact Me</div>

        <div className={styles.description}>
          {PROFILE_DATA.contact.description}
        </div>

        <div className={styles.inputs}>
          <div className={styles.primeinput}>
            <input type="text" placeholder="Full Name" />
          </div>

          <div className={styles.primeinput}>
            <input type="email" placeholder="Email Address" />
          </div>

          <div className={styles.primeinput}>
            <input type="text" placeholder="Message" />
          </div>

          <button type="button" className={styles.primebtn}>
            Send
          </button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className={styles.contactdirect}>
        <div className={styles.heading3}>Contact Details</div>

        <div className={styles.details}>{PROFILE_DATA.email}</div>
        <div className={styles.details}>{PROFILE_DATA.location}</div>

        <div className={styles.links}>
          <a href={PROFILE_DATA.linkedinUrl} target="_blank" rel="noopener noreferrer">
            LinkedIn <Image src={asset("/open.svg")} alt="" width={12} height={12} />
          </a>

          <a href={PROFILE_DATA.instagramUrl} target="_blank" rel="noopener noreferrer">
            Instagram <Image src={asset("/open.svg")} alt="" width={12} height={12} />
          </a>

          <a href={PROFILE_DATA.githubUrl} target="_blank" rel="noopener noreferrer">
            Github <Image src={asset("/open.svg")} alt="" width={12} height={12} />
          </a>
        </div>
      </div>
    </section>
  );
}
