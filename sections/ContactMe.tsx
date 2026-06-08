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

          <div className={styles.primebtn}>
            <div>Send</div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className={styles.contactdirect}>
        <div className={styles.heading3}>Contact Details</div>

        <div className={styles.details}>{PROFILE_DATA.email}</div>
        <div className={styles.details}>{PROFILE_DATA.location}</div>

        <div className={styles.links}>
          <a href={PROFILE_DATA.linkedinUrl} target="_blank" rel="noopener noreferrer">
            LinkedIn <img src={asset("/open.svg")} alt="open" />
          </a>

          <a href={PROFILE_DATA.instagramUrl} target="_blank" rel="noopener noreferrer">
            Instagram <img src={asset("/open.svg")} alt="open" />
          </a>

          <a href={PROFILE_DATA.githubUrl} target="_blank" rel="noopener noreferrer">
            Github <img src={asset("/open.svg")} alt="open" />
          </a>
        </div>
      </div>
    </section>
  );
}
