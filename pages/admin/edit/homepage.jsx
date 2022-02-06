import { useEffect } from "react";
import AdminLayout from "../../../src/components/admin/AdminLayout";
import { Input } from "../../../src/components/ui/ui";
import styles from "../../../styles/admin/edit/HomePage.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";

const homepage = () => {
  const [homePageData, sethomePageData] = useState(null);
  const [homePage, sethomePage] = useState(homePageData ? homePageData[0]:null);
  const [social, setsocial] = useState({ link: "", icon: "" });
  const [videoLink, setvideoLink] = useState("");

  const [testimonials, settestimonials] = useState({
    text: "",
    username: "",
  });

  const [hero, sethero] = useState(
    homePage
      ? homePage.hero
      : {
          heading: "",
          paragraph: "",
          emainHeading: "",
        }
  );
  const [signin, setsignin] = useState(
    homePage
      ? homepage.signin
      : {
          heading: "",
          texts: [],
          paragraph: "",
        }
  );

  const [facilities, setfacilities] = useState(
    homePage
      ? homePage.facilities
      : {
          heading: "",
        }
  );

  const [quote, setquote] = useState(
    homePage
      ? homePage.quote
      : {
          heading: "",
          paragraph: "",
          leftText: "",
          formHeading: "",
        }
  );
  const [testimonial, settestimonial] = useState(
    homePage
      ? homePage.testimonial
      : {
          heading: "",
          videos: [],
          testimonials: [],
        }
  );
  const [contact, setcontact] = useState(
    homePage
      ? homePage.contact
      : {
          heading: "",
          contact1title: "",
          contact1detail: "",
          contact2title: "",
          contact2detail: "",
          contact3title: "",
          contact3detail: "",
        }
  );
  const [footer, setfooter] = useState(
    homePage
      ? homePage.footer
      : {
          social: [],
        }
  );

  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  const addTestimonial = (e) => {
    e.preventDefault(),
      settestimonial({
        ...testimonial,
        testimonials: [...testimonial.testimonials, testimonials],
      });
  };

  const addSocialLink = (e) => {
    e.preventDefault();
    setfooter({ ...footer, social: [...footer.social, social] });
  };

  const addVideoLink = (e) => {
    e.preventDefault();

    settestimonial({
      ...testimonial,
      videos: [...testimonial.videos, videoLink],
    });
  };

  const getHomePageData = async () => {
    const res = await axios.get("/api/home");
    const data = res.data.home;
    sethomePageData(data);

  };

  useEffect(async () => {
    await getHomePageData();
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/admin/login");
    }

    if (user.role != "admin") {
      router.push("/admin/login");
    }
  }, [user]);

  const addHome = async (e) => {
    e.preventDefault();

    const res = await axios.post("/api/home", {
      hero,
      signin,
      facilities,
      quote,
      contact,
      testimonial,
      footer,
    });

  };

  console.log(homePageData);

  if (!homePageData) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout>
      <form action="" className={styles.form} onSubmit={addHome}>
        <div className={styles.hero}>
          <h2>Hero section</h2>
          <div>
            <Input
              value={hero.heading}
              label={"Heading"}
              onChange={(e) => sethero({ ...hero, heading: e.target.value })}
            />
            <Input
              value={hero.paragraph}
              label={"Short paragraph"}
              onChange={(e) => sethero({ ...hero, paragraph: e.target.value })}
            />
            <Input
              label={"Email box headnig"}
              onChange={(e) =>
                sethero({ ...hero, emailHeading: e.target.value })
              }
            />
          </div>
        </div>
        <div className={styles.signIn}>
          <h2>Sign In section</h2>
          <div>
            <Input
              value={signin.heading}
              label={"Headlig"}
              onChange={(e) =>
                setsignin({ ...signin, heading: e.target.value })
              }
            />
            <Input
              value={signin.paragraph}
              label={"Paragraph"}
              onChange={(e) =>
                setsignin({ ...signin, paragraph: e.target.value })
              }
            />
            <Input label={"Animated texts"} />
          </div>
        </div>

        <div className={styles.facilities}>
          <h2>Facilities section</h2>
          <div>
            <Input
              value={facilities.heading}
              label={"Short paragraph"}
              onChange={(e) =>
                setfacilities({ ...facilities, heading: e.target.value })
              }
            />
          </div>
        </div>

        <div className={styles.quote}>
          <h2>Quote section</h2>
          <div>
            <Input
              label={"Heading"}
              onChange={(e) => setquote({ ...quote, heading: e.target.value })}
            />
            <Input
              label={"Paragraph"}
              onChange={(e) =>
                setquote({ ...quote, paragraph: e.target.value })
              }
            />
            <Input
              label="Left text"
              onChange={(e) => setquote({ ...quote, leftText: e.target.value })}
            />
            <Input
              label="Right form heading"
              onChange={(e) =>
                setquote({ ...quote, formHeading: e.target.value })
              }
            />
          </div>
        </div>

        <div className={styles.success}>
          <h2>Testimonial section</h2>
          <div>
            <Input
              value={testimonial.heading}
              label={"Heading"}
              onChange={(e) =>
                settestimonial({ ...testimonial, heading: e.target.value })
              }
            />
            <div className={styles.inputGroup}>
              <Input
                label={"Testimonial videos link"}
                onChange={(e) => setvideoLink(e.target.value)}
              />
              <button className={styles.button} onClick={addVideoLink}>
                Add link
              </button>
            </div>

            <div className={styles.inputGroup}>
              <Input
                label={"Testimonials"}
                onChange={(e) =>
                  settestimonials({ ...testimonials, text: e.target.value })
                }
              />
              <Input
                label={"Testimonials"}
                onChange={(e) =>
                  settestimonials({ ...testimonials, username: e.target.value })
                }
              />
              <button className={styles.button} onClick={addTestimonial}>
                Add Testimonial
              </button>
            </div>
          </div>
        </div>
        <div className={styles.contact}>
          <h2>Contact section</h2>
          <div>
            <Input
              value={contact.heading}
              label={"Contact Heading"}
              onChange={(e) =>
                setcontact({ ...contact, heading: e.target.value })
              }
            />
            <div className={styles.inputGroup}>
              <Input
                label={"Contact 1 title"}
                onChange={(e) =>
                  setcontact({ ...contact, contact1title: e.target.value })
                }
              />
              <Input
                label={"Contact 1 address"}
                onChange={(e) =>
                  setcontact({ ...contact, contact1detail: e.target.value })
                }
              />
            </div>
            <div className={styles.inputGroup}>
              <Input
                value={contact.contact2title}
                label={"Contact 1 title"}
                onChange={(e) =>
                  setcontact({ ...contact, contact2title: e.target.value })
                }
              />
              <Input
                value={contact.contact2detail}
                label={"Contact 1 address"}
                onChange={(e) =>
                  setcontact({ ...contact, contact2detail: e.target.value })
                }
              />
            </div>
            <div className={styles.inputGroup}>
              <Input
                value={contact.contact3title}
                label={"Contact 1 title"}
                onChange={(e) =>
                  setcontact({ ...contact, contact3title: e.target.value })
                }
              />
              <Input
                value={contact.contact3detail}
                label={"Contact 1 address"}
                onChange={(e) =>
                  setcontact({ ...contact, contact3detail: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <h2>Footer section</h2>
          <div>
            <div className={styles.inputGroup}>
              <Input
                label={"Social media icon link"}
                onChange={(e) => setsocial({ ...social, link: e.target.value })}
              />
              <Input
                label={"Social link"}
                onChange={(e) => setsocial({ ...social, icon: e.target.value })}
              />
              <button className={styles.button} onClick={addSocialLink}>
                Add social link
              </button>
            </div>
          </div>
        </div>

        <div>
          <button type="submit" onClick={addHome} className={styles.submit}>
            Submit
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default homepage;
