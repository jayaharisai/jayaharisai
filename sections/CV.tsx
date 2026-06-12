import styles from "@/styles/CV.module.css";
import { PROFILE_DATA } from "@/data/profile";
import { asset } from "@/lib/basePath";

export default function CV() {
  return (
    <div id="about" className={styles.cv}>
      <div className={styles.title}>About Me</div>

      <div className={styles.container}>
        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.profileBox}>
            <img src={asset("/myimage.jpg")} className={styles.avatarImg} alt={PROFILE_DATA.fullName} />
            <h2>{PROFILE_DATA.fullName}</h2>
            <p>{PROFILE_DATA.cv.subtitle}</p>
          </div>

          <div className={styles.section}>
            <h4>Contact</h4>
            <p>Email: {PROFILE_DATA.email}</p>
            <p>Location: {PROFILE_DATA.location}</p>
            <p>
              GitHub:{" "}
              <a
                href={PROFILE_DATA.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "underline" }}
              >
                {PROFILE_DATA.github}
              </a>
            </p>
          </div>

          <div className={styles.section}>
            <h4>Skills</h4>
            {PROFILE_DATA.cv.skills.map((skill, index) => (
              <p key={index}>{skill}</p>
            ))}
          </div>

          <div className={styles.section}>
            <h4>Education</h4>
            <p>{PROFILE_DATA.cv.education.degree}</p>
            <p>{PROFILE_DATA.cv.education.institution}</p>
            <p>{PROFILE_DATA.cv.education.passout}</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <div className={styles.block}>
            <h3>Profile</h3>
            <p dangerouslySetInnerHTML={{ __html: PROFILE_DATA.cv.bio.replace(new RegExp(PROFILE_DATA.name, "g"), `<b>${PROFILE_DATA.name}</b>`) }} />
          </div>

          <div className={styles.block}>
            <h3>Current Role</h3>
            <p>{PROFILE_DATA.cv.role}</p>
          </div>

          <div className={styles.block}>
            <h3>Focus Areas</h3>
            <p>{PROFILE_DATA.cv.focusAreas}</p>
          </div>

        </div>
      </div>
    </div>
  );
}