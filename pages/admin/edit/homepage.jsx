import { useEffect } from "react";
import AdminLayout from "../../../src/components/admin/AdminLayout";
import { Input, Loader } from "../../../src/components/ui/ui";
import styles from "../../../styles/admin/edit/HomePage.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BsArchive } from "react-icons/bs";

const Homepage = () => {
  const [file, setfile] = useState(null);
  const [homePage, sethomePage] = useState(null);
  const [social, setsocial] = useState({ link: "", icon: "" });
  const [videoLink, setvideoLink] = useState("");
  const [animatedText, setanimatedText] = useState("");

  const [testimonials, settestimonials] = useState({
    text: "",
    username: "",
  });

  const [hero, sethero] = useState(homePage?.hero);
  const [signin, setsignin] = useState(
    homePage
      ? homePage.signin
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
          contact4title: "",
          contact4detail: "",
          contact5title: "",
          contact5detail: "",
          contact6title: "",
          contact6detail: "",
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
    settestimonials({
      text: "",
      username: "",
    });
  };

  const addAnimatedText = (e) => {
    e.preventDefault();
    setsignin({ ...signin, texts: [...signin.texts, animatedText] });

    setanimatedText("");
  };
  const removeAnimatedText = (Text) => {
    setsignin({ ...signin, texts: signin.texts.filter((txt) => txt !== Text) });
  };

  const addSocialLink = (e) => {
    e.preventDefault();
    setfooter({ ...footer, social: [...footer.social, social] });
    setsocial({ link: "", icon: "" });
  };

  const addVideoLink = (e) => {
    e.preventDefault();

    settestimonial({
      ...testimonial,
      videos: [...testimonial.videos, videoLink],
    });
    setvideoLink("");
  };

  const removeVideoLink = (link) => {
    settestimonial({
      ...testimonial,
      videos: testimonial.videos.filter((video) => video !== link),
    });
  };
  const getHomePageData = async () => {
    const res = await axios.get("/api/home");

    if (res.status == 200) {
      const data = res.data.home;

      sethomePage(data);
      sethero(data.hero);
      setcontact(data.contact);
      setquote(data.quote);
      setfacilities(data.facilities);
      setsignin(data.signin);
      settestimonial(data.testimonial);
      setfooter(data.footer);
    }
  };

  useEffect(() => {
    getHomePageData();
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

    try {
      if (file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "b2bwebsite");
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/mdalif/image/upload",
          data
        );

        const { secure_url, public_id } = uploadRes.data;
        hero.image.url = secure_url;
        hero.image.public_id = public_id;
        console.log("....");
      }

      const res = await axios.put("/api/home", {
        _id: homePage._id,
        hero,
        signin,
        facilities,
        quote,
        contact,
        testimonial,
        footer,
      });
      console.log(res);

      if (res.status == 201) {
        toast.success("Successfully saved update");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  if (
    !hero &&
    !signin &&
    !facilities &&
    !quote &&
    !contact &&
    !testimonial &&
    !footer
  ) {
    return <Loader />;
  }

  return (
    <AdminLayout>
      <form  className={styles.form} onSubmit={addHome}>
        <div className={styles.hero}>
          <h2>Hero section</h2>
          <div>
            <Input
              value={hero?.heading}
              label={"Heading"}
              onChange={(e) => sethero({ ...hero, heading: e.target.value })}
            />
            <Input
              value={hero?.paragraph}
              label={"Short paragraph"}
              onChange={(e) => sethero({ ...hero, paragraph: e.target.value })}
            />
            <Input
              value={hero?.emailHeading}
              label={"Email box headnig"}
              onChange={(e) =>
                sethero({ ...hero, emailHeading: e.target.value })
              }
            />

            <div className={styles.fileInput}>
              <label htmlFor="fileInput">
                
                <div>Select Background Image</div>
              </label>
              <input
                id="fileInput"
                type="file"
                onChange={(e) => setfile(e.target.files[0])}
              />
            </div>
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
            <div className={styles.videoLinks}>
              {signin.texts.map((text, index) => (
                <div className={styles.videoLink} key={index}>
                  <p>{text}</p>
                  <span onClick={() => removeAnimatedText(text)}>
                    <BsArchive />
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.inputGroup}>
              <Input
                value={animatedText}
                label={"Animated Texts"}
                onChange={(e) => setanimatedText(e.target.value)}
              />
              <button className={styles.button} onClick={addAnimatedText}>
                Add Animated Text
              </button>
            </div>
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
              value={quote.heading}
              label={"Heading"}
              onChange={(e) => setquote({ ...quote, heading: e.target.value })}
            />
            <Input
              value={quote.paragraph}
              label={"Paragraph"}
              onChange={(e) =>
                setquote({ ...quote, paragraph: e.target.value })
              }
            />
            <Input
              value={quote.leftText}
              label="Left text"
              onChange={(e) => setquote({ ...quote, leftText: e.target.value })}
            />
            <Input
              value={quote.formHeading}
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
            <div className={styles.videoLinks}>
              {testimonial.videos.map((link, index) => (
                <div className={styles.videoLink} key={index}>
                  
                  <p>{link}</p>
                  <span onClick={() => removeVideoLink(link)}>
                    <BsArchive />
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.inputGroup}>
              <Input
                value={videoLink}
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
                value={contact.contact1title}
                label={"Contact 1 title"}
                onChange={(e) =>
                  setcontact({ ...contact, contact1title: e.target.value })
                }
              />
              <Input
                value={contact.contact1detail}
                label={"Contact 1 address"}
                onChange={(e) =>
                  setcontact({ ...contact, contact1detail: e.target.value })
                }
              />
            </div>
            <div className={styles.inputGroup}>
              <Input
                value={contact.contact2title}
                label={"Contact 2 title"}
                onChange={(e) =>
                  setcontact({ ...contact, contact2title: e.target.value })
                }
              />
              <Input
                value={contact.contact2detail}
                label={"Contact 2 address"}
                onChange={(e) =>
                  setcontact({ ...contact, contact2detail: e.target.value })
                }
              />
            </div>
            <div className={styles.inputGroup}>
              <Input
                value={contact.contact3title}
                label={"Contact 3 title"}
                onChange={(e) =>
                  setcontact({ ...contact, contact3title: e.target.value })
                }
              />
              <Input
                value={contact.contact3detail}
                label={"Contact 3 address"}
                onChange={(e) =>
                  setcontact({ ...contact, contact3detail: e.target.value })
                }
              />
            </div>
            <div className={styles.inputGroup}>
              <Input
                value={contact.contact3title}
                label={"Contact 4 title"}
                onChange={(e) =>
                  setcontact({ ...contact, contact3title: e.target.value })
                }
              />
              <Input
                value={contact.contact4detail}
                label={"Contact 4 address"}
                onChange={(e) =>
                  setcontact({ ...contact, contact4detail: e.target.value })
                }
              />
            </div>
            <div className={styles.inputGroup}>
              <Input
                value={contact.contact5title}
                label={"Contact 5 title"}
                onChange={(e) =>
                  setcontact({ ...contact, contact5title: e.target.value })
                }
              />
              <Input
                value={contact.contact3detail}
                label={"Contact 5 address"}
                onChange={(e) =>
                  setcontact({ ...contact, contact5detail: e.target.value })
                }
              />
            </div>
            <div className={styles.inputGroup}>
              <Input
                value={contact.contact6title}
                label={"Contact 6 title"}
                onChange={(e) =>
                  setcontact({ ...contact, contact6title: e.target.value })
                }
              />
              <Input
                value={contact.contact6detail}
                label={"Contact 6 address"}
                onChange={(e) =>
                  setcontact({ ...contact, contact6detail: e.target.value })
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

export default Homepage;
