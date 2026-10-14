
"use client";

import { useEffect, useRef, useState } from "react";

const LOVE_CONFIG = {
  yourName: "Your life long Crime Partner",
  wifeName: "My Love",

  // Change these dates to your real dates (YYYY-MM-DD).
  wifeBirthDate: "2002-10-20",
  relationshipStartDate: "2025-05-04",
  anniversaryDate: "2025-12-14",

  // Browser-only password: this is not secure authentication.
  password: "2545",

  welcomeTitle: "A little world made just for you",
  welcomeMessage:
    "I made something special for the most beautiful part of my life.",

  birthdayMessage: "Happy Birthday, My Love!",
  birthdaySubtitle:
    "Today is special because the world was blessed with you.",

  loveLetter: `My dearest love,

  If I could choose again, I would still choose you.
  You have brought a happiness into my life that words
  can never completely explain.

  Thank you for every smile, every memory, every little
  moment, and every dream we share.

  I want to keep making memories with you, celebrating
  your happiest days, and holding your hand through
  every chapter of our lives.

  Happy Birthday, my beautiful wife.
  You will always have my heart.

  Forever yours,
  Your husband ❤️`,

  giftClue:
    "Your real birthday gift is waiting somewhere in our room! 💝 " +
    "Look near the place where you get ready. Follow your heart!",

  finalMessage:
    "My favourite place in this world will always be beside you. " +
    "Happy Birthday, my love. This is only the beginning of our story. ❤️",

  memories: [
    {
      date: "The day we promised",
      title: "Engagement - A Special Promised",
      description:
        "Our first major step together, marking a special moment when we pledged our love. It was the begining of beatiful story, a special moment that is forever etched in my mind, a promise Iam grateful for every day.",
      image: "/images/AGardenRingExchange.png",
    },
    {
      date: "A special day, Our story began",
      title: "One of my favourite memories",
      description:
        "The beginning of a beautiful story I never want to end. A moment I will always keep close to my heart. The day we promised to walk through life together.",
      image: "/images/enagementring.png",
    },
    {
      date: "Our future journey together",
      title: "Forever started here",
      description:
        "I promise to stand beside you, support your dreams, share your smiles, and love you in ways that words could never fully explain. Our forever started here, and my greatest wish is to keep choosing you, every single day.",
      image: "/images/walk.png",
    },
  ],
};

type Memory = (typeof LOVE_CONFIG.memories)[number];

const PAGE_NAMES = [
  "Welcome",
  "Unlock",
  "Our story",
  "Memories",
  "Birthday",
  "Love letter",
  "Gift",
  "Forever",
];

function getDuration(startDate: string) {
  const start = new Date(`${startDate}T00:00:00`);
  const now = new Date();

  if (Number.isNaN(start.getTime()) || start > now) {
    return { years: 0, months: 0, days: 0, totalDays: 0 };
  }

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const lastDayOfPreviousMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      0
    ).getDate();
    days += lastDayOfPreviousMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor(
    (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  return { years, months, days, totalDays };
}

function Hearts() {
  return (
    <div className="floating-hearts" aria-hidden="true">
      {Array.from({ length: 14 }, (_, i) => (
        <span
          key={i}
          style={{
            left: `${(i * 37 + 7) % 100}%`,
            animationDelay: `${(i % 7) * -1.8}s`,
            animationDuration: `${8 + (i % 5) * 2}s`,
            fontSize: `${14 + (i % 4) * 7}px`,
          }}
        >
          {i % 3 === 0 ? "♡" : "♥"}
        </span>
      ))}
    </div>
  );
}

function DurationCard({
  title,
  date,
}: {
  title: string;
  date: string;
}) {
  const [duration, setDuration] = useState(() => getDuration(date));

  useEffect(() => {
    const update = () => setDuration(getDuration(date));
    update();

    // Refresh the counter periodically.
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, [date]);

  return (
    <div className="duration-card">
      <p className="eyebrow">{title}</p>
      <div className="duration-grid">
        <div>
          <strong>{duration.years}</strong>
          <span>Years</span>
        </div>
        <div>
          <strong>{duration.months}</strong>
          <span>Months</span>
        </div>
        <div>
          <strong>{duration.days}</strong>
          <span>Days</span>
        </div>
      </div>
      <p className="total-days">
        {duration.totalDays.toLocaleString()} days and counting ♡
      </p>
    </div>
  );
}

export default function BirthdayExperience() {
  const [page, setPage] = useState(0);
  const [password, setPassword] = useState("Password");
  const [error, setError] = useState("");
  const [musicOn, setMusicOn] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [openedGifts, setOpenedGifts] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [countdown, setCountdown] = useState<number | null>(3);
const [birthdayBlast, setBirthdayBlast] = useState(false);

useEffect(() => {
  if (page !== 4 || birthdayBlast) return;

  setCountdown(3);

  const timers = [
    window.setTimeout(() => setCountdown(2), 1000),
    window.setTimeout(() => setCountdown(1), 2000),
    window.setTimeout(() => {
      setCountdown(null);
      setBirthdayBlast(true);
    }, 3000),
  ];

  return () => timers.forEach(window.clearTimeout);
}, [page, birthdayBlast]);
  useEffect(() => {
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (musicOn) {
      audio.pause();
      setMusicOn(false);
      return;
    }

    try {
      await audio.play();
      setMusicOn(true);
    } catch {
      setError(
        "Add public/music.mp3 and tap the music button again."
      );
    }
  }

  function unlock() {
    if (password.trim() === LOVE_CONFIG.password) {
      setError("");
      setPassword("");
      setPage(2);
      return;
    }

    setError("That isn't our secret word. Try again, my love ❤️");
  }

  function next() {
    setPage((current) => Math.min(current + 1, PAGE_NAMES.length - 1));
  }

  function restart() {
    setPage(0);
    setPassword("");
    setError("");
    setLetterOpen(false);
  }

  return (
    <main className="love-app">
      <Hearts />

      <header className="topbar">
        <a
          href="#home"
          className="brand"
          onClick={(event) => {
            event.preventDefault();
            setPage(0);
          }}
        >
          ♡ A Little Forever
        </a>

        <button
          className="music-button"
          onClick={toggleMusic}
          aria-pressed={musicOn}
        >
          {musicOn ? "♫ Music on" : "♫ Play our song"}
        </button>
      </header>

      <section className="experience">
        <div className="page-indicator">
          {PAGE_NAMES[page]} · {page + 1} of {PAGE_NAMES.length}
        </div>

        {page === 0 && (
          <div className="panel hero-panel fade-in" id="home">
            <div className="big-heart">♥</div>
            <p className="eyebrow">A little surprise for</p>
            <h1>
              {LOVE_CONFIG.wifeName}
              <br />
              <span>My favourite person</span>
            </h1>
            <p className="subtitle">{LOVE_CONFIG.welcomeTitle}</p>
            <p>{LOVE_CONFIG.welcomeMessage}</p>
            <button className="primary-button" onClick={next}>
              Begin our little story <span>♡</span>
            </button>
            <p className="tiny-note">Made with all my love</p>
          </div>
        )}

        {page === 1 && (
          <div className="panel fade-in">
            <div className="icon-circle">🔐</div>
            <p className="eyebrow">Just for us</p>
            <h1>Our little secret</h1>
            <p>
              Enter the special word to unlock your birthday surprise.
            </p>

            <form
              className="password-form"
              onSubmit={(event) => {
                event.preventDefault();
                unlock();
              }}
            >
              <label htmlFor="secret-password">Our secret password</label>
              <input
                id="secret-password"
                type="password"
                autoComplete="off"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter our secret word"
                required
              />
              {error && <p className="error-message">{error}</p>}
              <button className="primary-button" type="submit">
                Unlock my heart ♡
              </button>
            </form>
          </div>
        )}

        {page === 2 && (
          <div className="panel fade-in">
            <div className="big-heart pulse">♥</div>
            <p className="eyebrow">The day everything changed</p>
            <h1>
              The day you entered
              <br />
              <span>my life</span>
            </h1>
            <p className="date-label">
              {new Date(
                `${LOVE_CONFIG.relationshipStartDate}T00:00:00`
              ).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

            <DurationCard
              title="Our story so far"
              date={LOVE_CONFIG.relationshipStartDate}
            />

            <DurationCard
              title={`${LOVE_CONFIG.wifeName}'s beautiful life`}
              date={LOVE_CONFIG.wifeBirthDate}
            />

            <p className="subtitle">
              Every day with you is another memory worth keeping.
            </p>
            <button className="primary-button" onClick={next}>
              Walk through our memories →
            </button>
          </div>
        )}

        {page === 3 && (
          <div className="panel memories-panel fade-in">
            <p className="eyebrow">Little moments, endless love</p>
            <h1>Our <span>memories</span></h1>
            <p>Three little chapters of a story I treasure.</p>

            <div className="memory-list">
              {LOVE_CONFIG.memories.map((memory: Memory, index) => (
                <article className="memory-card" key={memory.title}>
                  <div className="memory-image-wrap">
                    <img
                      src={memory.image}
                      alt={memory.title}
                      className="memory-image"
                    />
                    <span className="memory-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="memory-copy">
                    <p className="eyebrow">{memory.date}</p>
                    <h2>{memory.title}</h2>
                    <p>{memory.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <button className="primary-button" onClick={next}>
              One more thing, birthday girl →
            </button>
          </div>
        )}


        {page === 4 && (
          // <div className="panel birthday-panel fade-in">
          //   {/* Animated background effects */}
          //   <div className="birthday-effects" aria-hidden="true">
          //     {/* Floating CSS balloons */}
          //     <div className="balloon-field">
          //       {Array.from({ length: 12 }, (_, i) => (
          //         <span
          //           key={`balloon-${i}`}
          //           className={`balloon balloon-${(i % 6) + 1}`}
          //           style={{
          //             left: `${(i * 31 + 3) % 100}%`,
          //             animationDelay: `${(i % 6) * -1.7}s`,
          //             animationDuration: `${7 + (i % 4) * 1.5}s`,
          //           }}
          //         >
          //           <span className="balloon-string" />
          //         </span>
          //       ))}
          //     </div>

          //     {/* Confetti blast after countdown */}
          //     {birthdayBlast && (
          //       <div className="blast-field">
          //         {Array.from({ length: 90 }, (_, i) => (
          //           <span
          //             key={`confetti-${i}`}
          //             className={`confetti-piece confetti-${(i % 6) + 1}`}
          //             style={{
          //               left: `${(i * 47) % 100}%`,
          //               animationDelay: `${(i % 15) * 0.04}s`,
          //               animationDuration: `${2.5 + (i % 5) * 0.4}s`,
          //             }}
          //           />
          //         ))}
          //       </div>
          //     )}
          //   </div>

          //   {/* Countdown overlay */}
          //   {countdown !== null && !birthdayBlast && (
          //     <div className="birthday-countdown" aria-live="assertive">
          //       <p>Something special is coming...</p>
          //       <span key={countdown} className="countdown-number">
          //         {countdown}
          //       </span>
          //     </div>
          //   )}

          //   {/* Birthday content */}
          //   <p className="eyebrow">Today is all about you ♡</p>

          //   <h1>{LOVE_CONFIG.birthdayMessage}</h1>

          //   <p>{LOVE_CONFIG.birthdaySubtitle}</p>

          //   {/* Birthday cake */}
          //   <div
          //     className="cake"
          //     aria-label="A birthday cake with three candles"
          //   >
          //     <div className="candles">
          //       <span className="flame">✦</span>
          //       <span className="flame">✦</span>
          //       <span className="flame">✦</span>
          //     </div>

          //     <div className="cake-top" />
          //     <div className="cake-middle" />
          //     <div className="cake-bottom" />
          //     <div className="cake-plate" />
          //   </div>

          //   {/* Birthday photo */}
          //   <div className="birthday-photo">
          //     <img
          //       src="/images/wish.png"
          //       alt={`Birthday wishes for ${LOVE_CONFIG.wifeName}`}
          //     />
          //   </div>

          //   <p className="subtitle">
          //     Make a wish, close your eyes, and know how loved you are. ♡
          //   </p>

          //   {/* Continue to love letter */}
          //   <button
          //     className="primary-button"
          //     onClick={() => {
          //       next();
          //       setLetterOpen(false);
          //     }}
          //   >
          //     Read your love letter 💌
          //   </button>
          // </div>
          <div className="panel birthday-panel fade-in birthday-surprise">

    <p className="eyebrow">Today is all about you ♡</p>

    <h1>{LOVE_CONFIG.birthdayMessage}</h1>

    <p>{LOVE_CONFIG.birthdaySubtitle}</p>

    {/* Birthday cake with three candles */}
    <div className="animated-cake-scene">
      <div className="animated-cake">
        <div className="animated-candles">
          {[1, 2, 3].map((candle) => (
            <div
              className={`animated-candle candle-${candle}`}
              key={candle}
            >
              <span className="animated-flame">🔥</span>
              <span className="candle-stick" />
            </div>
          ))}
        </div>

        <div className="animated-cake-top" />
        <div className="animated-cake-middle" />
        <div className="animated-cake-bottom" />
        <div className="animated-cake-plate" />
      </div>
    </div>

    {/* Cute cat enters after all candles go out */}
    <div className="birthday-cat-scene" aria-label="A cat celebrating your birthday">
      <div className="birthday-cat">
        <span className="cat-face">🐱</span>
        <span className="cat-popper">🎉</span>
      </div>
    </div>

    {/* Birthday surprise message */}
    <div className="birthday-yay">
      <h2>Yayyy!! 🎉</h2>
      <h2>Happy Birthday, My Love! ❤️</h2>
      <p>May your life always be filled with happiness, love, and beautiful surprises. 💖</p>
    </div>

    {/* Confetti celebration */}
    <div className="birthday-confetti" aria-hidden="true">
      {Array.from({ length: 45 }, (_, i) => (
        <span
          key={i}
          className={`birthday-confetti-piece confetti-color-${(i % 5) + 1}`}
          style={{
            left: `${(i * 37) % 100}%`,
            animationDelay: `${5.5 + (i % 15) * 0.12}s`,
            animationDuration: `${2.5 + (i % 4) * 0.5}s`,
          }}
        />
      ))}
    </div>

    {/* Continue to your existing love letter page */}
    <button
      className="primary-button birthday-continue"
      onClick={() => {
        next();
        setLetterOpen(false);
      }}
    >
      Read your love letter 💌
    </button>

  </div>
        )}


        {page === 5 && (
          <div className="panel letter-panel fade-in">
            <p className="eyebrow">From my heart to yours</p>
            <h1>A letter <span>for you</span></h1>

            {!letterOpen ? (
              <>
                <button
                  className="envelope"
                  onClick={() => setLetterOpen(true)}
                  aria-label="Open your love letter"
                >
                  <span className="envelope-heart">♥</span>
                  <span>Open your letter</span>
                  <span className="envelope-flap" />
                </button>
                <p className="tiny-note">A few words I've always wanted to say.</p>
              </>
            ) : (
              <article className="letter-paper fade-in">
                <span className="letter-decoration">♡</span>
                <p className="letter-text">{LOVE_CONFIG.loveLetter}</p>
                <span className="letter-decoration">Forever & always ♡</span>
              </article>
            )}

            {letterOpen && (
              <button className="primary-button" onClick={next}>
                There is one more surprise →
              </button>
            )}
          </div>
        )}

      
        {page === 6 && (
          <div className="panel gift-panel fade-in">
            <p className="eyebrow">Something special is waiting</p>

            <h1>Your birthday <span>gifts</span></h1>

            <p>
              Three little surprises, three heartfelt messages,
              and all my love wrapped inside. Open each gift to
              discover what I have to tell you. ❤️
            </p>

            <div className="gift-cards-container">
              {[
                {
                  id: 1,
                  emoji: "🎁",
                  title: "The First Surprise",
                  subtitle: "Tap to discover your clue",
                  message:
                    "Where you get ready and look beautiful every day, your first surprise is waiting for you. 💗",
                },
                {
                  id: 2,
                  emoji: "🎁",
                  title: "A Piece of My Heart",
                  subtitle: "Your next clue is waiting",
                  message:
                    "Look where we rest our heads at night. Something special is waiting close to where we dream together. 💕",
                },
                {
                  id: 3,
                  emoji: "🎁",
                  title: "The Final Treasure",
                  subtitle: "Unlock your last clue",
                  message:
                    "Your final surprise is hiding somewhere you would never expect. Follow your heart and look where I keep something special just for you. ❤️",
                },
              ].map((gift) => {
                const isOpened = openedGifts.includes(gift.id);

                return (
                  <div
                    className={`gift-item ${isOpened ? "opened" : ""}`}
                    key={gift.id}
                  >
                    <button
                      className="gift-card"
                      onClick={() => {
                        if (!isOpened) {
                          setOpenedGifts((prev) => [...prev, gift.id]);
                        }
                      }}
                      disabled={isOpened}
                      aria-label={`Open gift ${gift.id}: ${gift.title}`}
                    >
                      <span className="gift-ribbon">🎀</span>

                      <span className="gift-box">
                        {isOpened ? "💖" : gift.emoji}
                      </span>

                      <strong>{gift.title}</strong>

                      <span>
                        {isOpened ? "Message revealed ❤️" : gift.subtitle}
                      </span>
                    </button>

                    {isOpened && (
                      <div className="clue-card fade-in">
                        <h2>My message to you 💌</h2>
                        <p>{gift.message}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="tiny-note">
              {openedGifts.length} of 3 surprises opened ❤️
            </p>

            {openedGifts.length === 3 && (
              <button
                className="primary-button fade-in"
                onClick={next}
              >
                One last message, my love ❤️
              </button>
            )}
          </div>
        )}


        {page === 7 && (
          <div className="panel final-panel fade-in">
            <div className="big-heart pulse">♥</div>
            <p className="eyebrow">My wish for us</p>
            <h1>To us, <span>forever</span></h1>
            <p className="final-message">{LOVE_CONFIG.finalMessage}</p>
            <div className="signature">
              With all my love,
              <strong>{LOVE_CONFIG.yourName} ♡</strong>
            </div>
            <button className="primary-button" onClick={restart}>
              Relive our little story ↻
            </button>
            <p className="tiny-note">You are my today and all my tomorrows.</p>
          </div>
        )}
      </section>

      <footer className="footer">
        <span>Made with ♥, just for {LOVE_CONFIG.wifeName}</span>
        {page > 0 && (
          <button
            className="back-button"
            onClick={() => setPage((current) => Math.max(current - 1, 0))}
          >
            ← Previous page
          </button>
        )}
      </footer>
    </main>
  );
}
