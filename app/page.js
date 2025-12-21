"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Tabs from "./ui/Tabs";
import PartnershipForm from "./ui/PartnershipForm";

/* -----------------------------
   Section Components
------------------------------ */
function Program() {
  return (
    <div className="container">
      <div className="grid2">
        <div className="panel">
          <div className="accentBar" />
          <div className="kicker">How our quarterly partnership works</div>
          <h2 className="h2">One featured rescue every quarter (3 months)</h2>
          <p className="p">
            Each quarter, we select one Arizona rescue to be our featured partner. During those three months, we focus on
            helping you in practical, hands on ways, and making the quarter financially beneficial for your organization.
          </p>
          <ul className="list">
            <li>Hosting a fundraising pop up event specifically for your rescue (local business, park, brewery, etc.)</li>
            <li>Running donation drives for supplies your organization needs</li>
            <li>Promoting your adoptable dogs on our social media</li>
            <li>Helping raise awareness for your mission</li>
            <li>Supporting your rescue however we can during that quarter</li>
          </ul>
        </div>

        <div className="panel">
          <div className="accentBar" />
          <div className="kicker">The goal</div>
          <h2 className="h2">Fun, community driven, and built to help</h2>
          <p className="p">
            These quarterly pop ups are designed to be fun, community driven, and financially beneficial to the rescue, with
            funds raised going directly to your organization.
          </p>

          <div style={{ display: "grid", gap: 12 }}>
            <div className="panel" style={{ padding: 14 }}>
              <div className="kicker" style={{ color: "rgba(90,46,166,.92)" }}>What you can expect</div>
              <ul className="list">
                <li>Clear planning and communication</li>
                <li>Respect for your policies, rules, and safety processes</li>
                <li>Promotion that highlights your dogs and your mission</li>
              </ul>
            </div>

            <div className="panel" style={{ padding: 14 }}>
              <div className="kicker">Why we are doing this</div>
              <p className="p" style={{ margin: 0 }}>
                We do not want to show up once and disappear. We want to create meaningful, ongoing support for each rescue we
                partner with, lighten the load, and help more dogs get adopted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Volunteer() {
  return (
    <div className="container">
      <div className="grid2">
        <div className="panel">
          <div className="accentBar" />
          <div className="kicker">Monthly volunteer support</div>
          <h2 className="h2">Hands on help during your partnership quarter</h2>
          <p className="p">
            Outside of the fundraising event, we also want to be involved hands on. Our goal is to come help your rescue at
            least once a month, offering support wherever it is needed most.
          </p>

          <div className="h3">Some ways we would love to volunteer</div>
          <ul className="list">
            <li>Taking adoptable dogs out for adventure days, hikes, and public outings while they wear “Adopt Me” vests</li>
            <li>Helping with kennel cleaning</li>
            <li>Assisting with transporting dogs or supplies</li>
            <li>Volunteering at your adoption events</li>
            <li>Helping with intake needs, if allowed</li>
            <li>Supporting staff with miscellaneous tasks</li>
          </ul>
        </div>

        <div className="panel">
          <div className="accentBar" />
          <div className="kicker">Your policies come first</div>
          <h2 className="h2">We will follow your process</h2>
          <p className="p">
            We completely respect your policies and will follow any rules, guidelines, or processes you have in place to ensure
            your dogs are safe and your team is supported.
          </p>

          <div className="panel" style={{ padding: 14 }}>
            <div className="kicker" style={{ color: "rgba(90,46,166,.92)" }}>We can adapt</div>
            <ul className="list">
              <li>Schedule visits around your busiest days</li>
              <li>Stay within approved areas and procedures</li>
              <li>Support staff the way you prefer</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Photography() {
  return (
    <div className="container">
      <div className="grid2">
        <div className="panel">
          <div className="accentBar" />
          <div className="kicker">Photography support</div>
          <h2 className="h2">Included in all partnerships</h2>
          <p className="p">
            We understand how much a great photo can change a dog’s chances of getting adopted, and we want to contribute that
            skill every month.
          </p>

          <div className="h3">Photography help we can provide</div>
          <ul className="list">
            <li>High quality adoption photos</li>
            <li>Day out adventure photos</li>
            <li>Photos you can use on Petfinder, your website, or social media</li>
            <li>Event photography</li>
            <li>Behind the scenes images for your organization</li>
          </ul>
        </div>

        <div className="panel">
          <div className="accentBar" />
          <div className="kicker">A little peek</div>
          <h3 className="h3" style={{ marginTop: 6 }}>A collage from our photography section</h3>

          <div className="photoCollage" style={{ marginTop: 14 }}>
            <img src="/dog1.jpg" alt="Rescue dog portrait" />
            <img src="/dog2.jpg" alt="Rescue dog portrait 2" />
          </div>

          <p className="p" style={{ marginTop: 14, marginBottom: 0 }}>
            Bright, clear photos and genuine personality shots help dogs get noticed faster.
          </p>
        </div>
      </div>
    </div>
  );
}

function Partner() {
  return (
    <div id="partnerSection" className="container">
      <div className="grid2">
        <div className="panel">
          <div className="accentBar" />
          <div className="kicker">Partner inquiry</div>
          <h2 className="h2">Partner With Us</h2>
          <p className="p">
            If you are open to collaborating, fill this out and we will reach back out. Our goal is to make your jobs easier,
            lighten the load, and help get more dogs adopted.
          </p>

          <div className="panel" style={{ padding: 14 }}>
            <div className="kicker" style={{ color: "rgba(90,46,166,.92)" }}>Quick note</div>
            <p className="p" style={{ margin: 0 }}>
              Submissions go straight into Supabase so you can track inquiries in one place.
            </p>
          </div>
        </div>

        <PartnershipForm />
      </div>
    </div>
  );
}

/* -----------------------------
   Page
------------------------------ */
export default function Page() {
  const [activeTab, setActiveTab] = useState("program");
  const userInteractedRef = useRef(false);

  const tabs = useMemo(
    () => [
      { id: "program", label: "Quarterly Program", icon: "✨", content: <Program /> },
      { id: "volunteer", label: "Volunteer Support", icon: "🐾", content: <Volunteer /> },
      { id: "photo", label: "Photography", icon: "📸", content: <Photography /> },
      { id: "partner", label: "Partner With Us", icon: "💬", content: <Partner /> },
    ],
    []
  );

  const scrollToIdSmooth = (id) => {
    const maxTries = 40;
    let tries = 0;

    const attempt = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      tries += 1;
      if (tries < maxTries) requestAnimationFrame(attempt);
    };

    requestAnimationFrame(attempt);
  };

  // Honor hash on first load only (no scrolling)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = (window.location.hash || "").replace("#", "");

    const map = {
      "tab-program": "program",
      "tab-volunteer": "volunteer",
      "tab-photo": "photo",
      "tab-partner": "partner",
    };

    const next = map[hash];
    if (next) {
      userInteractedRef.current = true;
      setActiveTab(next);
    }
  }, []);

  // Update hash when user changes tabs (NO SCROLL here)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!userInteractedRef.current) return;

    window.history.replaceState(null, "", `#tab-${activeTab}`);
  }, [activeTab]);

  // Hero CTA: scroll only from hero buttons
  const onHeroGo = (tabId) => {
    userInteractedRef.current = true;

    // Always scroll to tabs from hero CTA
    scrollToIdSmooth("tabs");

    if (tabId === "program") {
      window.history.replaceState(null, "", "#tab-program");
      setActiveTab("program");
      return;
    }

    if (tabId === "partner") {
      window.history.replaceState(null, "", "#tab-partner");
      setActiveTab("partner");

      // Then scroll to partner section after it renders
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToIdSmooth("partnerSection"));
      });

      return;
    }

    setActiveTab(tabId);
  };

  // Tab clicks: NO SCROLL, just set active tab
  const onTabChange = (tabId) => {
    userInteractedRef.current = true;
    setActiveTab(tabId);
  };

  return (
    <>
      <div className="azBg" />

      <header className="nav">
        <div className="container navInner">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Image src="/paw.png" alt="Burger Pack Paws Project" width={42} height={42} priority />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 900, letterSpacing: "-0.01em", fontSize: 16 }}>
                Burger Pack Paws Project
              </span>
              <span style={{ fontSize: 13, color: "rgba(18,16,22,0.68)" }}>
                Because every dog deserves a pack
              </span>
            </div>
          </div>

          <div className="navLinks">
            <a
              className="button"
              href="https://instagram.com/burgerpackpawsproject"
              target="_blank"
              rel="noreferrer"
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" style={{ display: "block" }}>
                  <path
                    fill="currentColor"
                    d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6z"
                  />
                  <path fill="currentColor" d="M17.5 6.2a1.1 1.1 0 1 1 0 2.2a1.1 1.1 0 0 1 0-2.2z" />
                </svg>
                <span>Instagram</span>
              </span>
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container heroGrid">
            <div>
              <div className="badge animate delay-1">Arizona • Rescue Support • Community</div>

              <h1 className="h1 animate delay-2">
                Consistent, meaningful support for Arizona rescues, one quarter at a time.
              </h1>

              <p className="p animate delay-3">
                Hi there! We are Rikki and Dillion. After rescuing eight dogs ourselves over the years, we wanted to take our
                passion for helping animals and turn it into something bigger, something that supports rescues consistently and
                meaningfully.
              </p>

              <div className="ctaRow animate delay-4">
                <button className="button" type="button" onClick={() => onHeroGo("program")}>
                  View Program
                </button>
                <button className="button buttonPrimary" type="button" onClick={() => onHeroGo("partner")}>
                  Partner With Us
                </button>
              </div>
            </div>

            <div className="panel">
              <div className="accentBar" />
              <Image
                src="/logo-wordmark.png"
                alt="Burger Pack Paws Project"
                width={900}
                height={900}
                style={{ width: "100%", height: "auto" }}
              />
              <p className="p" style={{ marginTop: 12 }}>
                We support Arizona’s rescue dogs and the incredible organizations who save them.
              </p>
            </div>
          </div>
        </section>

        <section id="tabs" className="section">
          <Tabs tabs={tabs} activeId={activeTab} onChange={onTabChange} />
        </section>
      </main>
    </>
  );
}
