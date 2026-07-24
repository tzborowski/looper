"use client";

import { FormEvent, useState } from "react";

const cities = [
  {
    name: "Kraków",
    country: "Polska",
    code: "KRK",
    districts: "Stare Miasto · Kazimierz · Podgórze",
    status: "Nabór społeczności",
    tone: "blue",
  },
  {
    name: "Wrocław",
    country: "Polska",
    code: "WRO",
    districts: "Śródmieście · Krzyki · Stare Miasto",
    status: "Nabór społeczności",
    tone: "violet",
  },
  {
    name: "Málaga",
    country: "Hiszpania",
    code: "AGP",
    districts: "Centro · Soho · La Malagueta",
    status: "Nabór społeczności",
    tone: "green",
  },
];

const principles = [
  ["01", "Szukasz", "Wskazujesz obszar, czas i gratyfikację. LOOPR wysyła sygnał do kierowców w pobliżu."],
  ["02", "Łączymy", "Aplikacja znajduje kierowcę, który wkrótce zwolni miejsce, i zabezpiecza synchronizację."],
  ["03", "Parkujesz", "Obie strony potwierdzają kolejne kroki, a LOOPR prowadzi Cię we właściwe miejsce i czas."],
];

export default function Home() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus("loading");
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          city: form.get("city"),
          district: form.get("district"),
          role: form.get("role"),
          problem: form.get("problem"),
          referrals: form.get("referrals"),
          ambassador: form.get("ambassador") === "on",
        }),
      });

      if (!response.ok) throw new Error("Nie udało się zapisać formularza.");
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <main>
      <header className="topbar">
        <a href="#top" className="logo" aria-label="LOOPR — strona główna">
          <img src="/brand/loopr-logo-crop.png" alt="LOOPR" />
        </a>
        <nav aria-label="Główna nawigacja">
          <a href="#jak-dziala">Jak działa</a>
          <a href="#aplikacja">Aplikacja MVP</a>
          <a href="#miasta">Miasta</a>
          <a href="#dla-inwestorow">Dla inwestorów</a>
        </nav>
        <a href="#dolacz" className="nav-button">
          Dołącz do LOOPR <span>→</span>
        </a>
      </header>

      <section className="hero" id="top">
        <div className="map-wash" aria-hidden="true" />
        <div className="hero-copy">
          <div className="status-pill">
            <span />
            Rusza nabór: Kraków · Wrocław · Málaga
          </div>
          <h1>
            Znajdź miejsce parkingowe.
            <em> Bez krążenia.</em>
          </h1>
          <p className="hero-lead">
            <strong>LOOPR to aplikacja mobilna, która łączy kierowcę szukającego
            miejsca z kierowcą, który właśnie je zwalnia.</strong> Synchronizujemy
            ich lokalizację i czas w bezpiecznym procesie prowadzonym krok po kroku.
          </p>
          <div className="hero-actions">
            <a href="#dolacz" className="button button-primary">
              Dołącz do pierwszych użytkowników <span>→</span>
            </a>
            <a href="#jak-dziala" className="button button-secondary">
              Zobacz, jak działa
            </a>
          </div>
          <div className="mode-pills" aria-label="Dwa główne tryby aplikacji">
            <div>
              <i className="search-icon" aria-hidden="true" />
              <span><strong>Szukam miejsca</strong><small>Znajdź kierowcę w pobliżu</small></span>
            </div>
            <div>
              <i className="car-icon" aria-hidden="true">▰</i>
              <span><strong>Zwalniam miejsce</strong><small>Pomóż innemu i odbierz gratyfikację</small></span>
            </div>
          </div>
        </div>

        <div className="hero-product" aria-label="Ekran główny aplikacji LOOPR">
          <div className="phone-shell">
            <img src="/brand/app-home.png" alt="Ekran główny aplikacji LOOPR z mapą i opcjami: Szukam miejsca oraz Zwalniam miejsce" />
          </div>
          <div className="floating-card float-one">
            <span className="pulse green" />
            <div><strong>Miejsce zwalnia się wkrótce</strong><small>Potencjalna synchronizacja</small></div>
          </div>
          <div className="floating-card float-two">
            <span className="pulse violet" />
            <div><strong>Synchronizacja aktywna</strong><small>Dwóch kierowców połączonych</small></div>
          </div>
        </div>
      </section>

      <section className="trust-bar" aria-label="Najważniejsze elementy LOOPR">
        <span>Geolokalizacja czasu rzeczywistego</span>
        <span>Dwustronne potwierdzenie</span>
        <span>Reputacja kierowców</span>
        <span>Bezpieczna gratyfikacja</span>
      </section>

      <section className="problem section" id="jak-dziala">
        <div className="section-label">Problem i rozwiązanie</div>
        <div className="split-heading">
          <h2>Miejsca się zwalniają.<br />Tylko nikt o tym nie wie.</h2>
          <div>
            <p>
              Kierowcy krążą, bo informacja o zwalnianym miejscu znika w kilka
              sekund. LOOPR zamienia tę niewidoczną rotację w koordynowany,
              przewidywalny proces.
            </p>
            <p className="legal-note">
              LOOPR nie sprzedaje publicznego miejsca. Koordynuje informację,
              czas i przyjazd kierowców.
            </p>
          </div>
        </div>
        <div className="principle-grid">
          {principles.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <div className={`principle-visual principle-${number}`}>
                <i />
                <b />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="app-showcase" id="aplikacja">
        <div className="section app-showcase-inner">
          <div className="section-label light">Aplikacja MVP</div>
          <div className="split-heading light">
            <h2>Dwie proste ścieżki.<br />Jeden udany sync.</h2>
            <p>
              Pierwsza wersja LOOPR koncentruje się na jednym zadaniu: skutecznie
              doprowadzić dwie osoby od sygnału do potwierdzonego przekazania
              informacji o zwalnianym miejscu.
            </p>
          </div>

          <div className="app-paths">
            <article>
              <div className="path-copy">
                <span>Ścieżka 01</span>
                <h3>Szukam miejsca</h3>
                <p>Ustawiasz obszar, czas oczekiwania i gratyfikację. LOOPR pokazuje aktywność oraz znajduje najlepiej dopasowanego kierowcę.</p>
                <ul>
                  <li>Signal to Area™</li>
                  <li>Promień i czas oczekiwania</li>
                  <li>Akceptacja dopasowania</li>
                </ul>
              </div>
              <div className="screen-window">
                <img src="/brand/app-find.png" alt="Trzy ekrany ścieżki Szukam miejsca w aplikacji LOOPR" />
              </div>
            </article>
            <article>
              <div className="path-copy">
                <span>Ścieżka 02</span>
                <h3>Zwalniam miejsce</h3>
                <p>Określasz lokalizację i czas odjazdu. Widzisz, jakie informacje udostępniasz, a gratyfikację otrzymujesz po zakończonym syncu.</p>
                <ul>
                  <li>Kontrola prywatności</li>
                  <li>Orientacyjna lokalizacja</li>
                  <li>Gratyfikacja po sukcesie</li>
                </ul>
              </div>
              <div className="screen-window portrait-window">
                <img src="/brand/app-share.png" alt="Ekrany ścieżki Zwalniam miejsce w aplikacji LOOPR" />
              </div>
            </article>
          </div>

          <div className="sync-feature">
            <div className="sync-copy">
              <span className="mini-tag">Rdzeń produktu</span>
              <h3>Aktywna synchronizacja prowadzi obie strony.</h3>
              <p>
                Statusy „jestem w pobliżu”, „możesz wyjeżdżać” i „potwierdź zajęcie
                miejsca” ograniczają chaos, nieporozumienia oraz no‑show.
              </p>
              <div className="sync-badges">
                <span>✓ Czas i odległość</span>
                <span>✓ Status obu kierowców</span>
                <span>✓ Potwierdzenie zakończenia</span>
              </div>
            </div>
            <img src="/brand/app-sync.png" alt="Aktywna synchronizacja w aplikacji LOOPR" />
          </div>
        </div>
      </section>

      <section className="cities section" id="miasta">
        <div className="section-label">Pierwsze miasta</div>
        <div className="split-heading">
          <h2>Nie uruchamiamy mapy.<br />Aktywujemy lokalną sieć.</h2>
          <p>
            LOOPR zaczyna od gęstych mikroobszarów. Najpierw budujemy społeczność
            kierowców i mapujemy problem, a produkt uruchamiamy tam, gdzie może
            zapewnić realną płynność od pierwszego dnia.
          </p>
        </div>
        <div className="city-grid">
          {cities.map((city) => (
            <article className={`city-card ${city.tone}`} key={city.name}>
              <div className="city-top">
                <span className="city-code">{city.code}</span>
                <span className="city-status"><i /> {city.status}</span>
              </div>
              <div className="city-map" aria-hidden="true">
                <span /><i /><b />
              </div>
              <h3>{city.name}</h3>
              <p>{city.country}</p>
              <small>{city.districts}</small>
              <a href="#dolacz">Dołącz do miasta <span>→</span></a>
            </article>
          ))}
        </div>
        <div className="activation-flow">
          <span><b>1</b> Dołączasz do miasta</span>
          <i>→</i>
          <span><b>2</b> Wskazujesz problematyczne strefy</span>
          <i>→</i>
          <span><b>3</b> Budujemy lokalną płynność</span>
          <i>→</i>
          <span><b>4</b> LOOPR rusza w dzielnicy</span>
        </div>
      </section>

      <section className="founders">
        <div className="section founders-inner">
          <div>
            <div className="section-label light">Founding Members</div>
            <h2>Dołącz zanim LOOPR ruszy w Twojej dzielnicy.</h2>
            <p>Pierwsi członkowie nie tylko testują aplikację. Pomagają zdecydować, gdzie i jak uruchomimy lokalną sieć.</p>
            <a href="#dolacz" className="button button-white">Zostań Founding Member <span>→</span></a>
          </div>
          <div className="founder-benefits">
            <article><span>01</span><h3>Wcześniejszy dostęp</h3><p>Zaproszenie do zamkniętego pilotażu w Twoim mieście.</p></article>
            <article><span>02</span><h3>Niższe opłaty</h3><p>Preferencyjne warunki dla pierwszej lokalnej społeczności.</p></article>
            <article><span>03</span><h3>Wpływ na produkt</h3><p>Bezpośredni udział w testach i priorytetyzacji rozwoju.</p></article>
            <article><span>04</span><h3>Status założyciela</h3><p>Rozpoznawalny status Founding Member w aplikacji.</p></article>
          </div>
        </div>
      </section>

      <section className="investors section" id="dla-inwestorow">
        <div className="section-label">Dla partnerów i inwestorów</div>
        <div className="split-heading">
          <h2>Warstwa koordynacji dla miejskiej mobilności.</h2>
          <p>
            LOOPR zaczyna od parkingowego core loopu, ale buduje aktywo o większej
            wartości: lokalną sieć kierowców, dane o rotacji i warstwę zaufania
            dla kolejnych usług mobilności.
          </p>
        </div>
        <div className="business-grid">
          <article>
            <span className="business-icon">↔</span>
            <h3>Powtarzalny core loop</h3>
            <p>Sygnał → dopasowanie → nawigacja → dwustronne potwierdzenie → reputacja.</p>
          </article>
          <article>
            <span className="business-icon">◎</span>
            <h3>Lokalna defensywność</h3>
            <p>Gęstość społeczności i dane o skuteczności rosną z każdym zakończonym synciem.</p>
          </article>
          <article>
            <span className="business-icon">%</span>
            <h3>Model przychodowy</h3>
            <p>Coordination Fee od udanych synchronizacji oraz abonamenty zamkniętych społeczności.</p>
          </article>
          <article>
            <span className="business-icon">＋</span>
            <h3>Rozszerzalna platforma</h3>
            <p>Private Spots, firmy i osiedla, merchant credits, hospitality oraz usługi smart city.</p>
          </article>
        </div>
        <div className="investor-note">
          <img src="/brand/app-reputation.png" alt="System reputacji kierowców LOOPR w wersji MVP" />
          <div>
            <span className="mini-tag">Trust layer</span>
            <h3>Reputacja oparta na realnie zakończonych synchronizacjach.</h3>
            <p>Ocena, skuteczność i liczba zakończonych synców pomagają podejmować decyzje bez zbędnej gamifikacji.</p>
            <a href="#dolacz">Porozmawiajmy o partnerstwie <span>→</span></a>
          </div>
        </div>
      </section>

      <section className="join-section" id="dolacz">
        <div className="join-map" aria-hidden="true" />
        <div className="join-copy">
          <div className="section-label light">Dołącz do sieci</div>
          <h2>Pomóż uruchomić LOOPR w swoim mieście.</h2>
          <p>
            Zapisz się jako kierowca, lokalny ambasador, partner organizacyjny
            lub inwestor. Każde zgłoszenie pomaga nam wybrać pierwsze dzielnice.
          </p>
          <div className="city-chips">
            <span>Kraków</span><span>Wrocław</span><span>Málaga</span>
          </div>
        </div>

        {formStatus === "success" ? (
          <div className="success-card" role="status">
            <span>✓</span>
            <h3>Jesteś na liście LOOPR.</h3>
            <p>Dziękujemy. Twoje zgłoszenie zostało zapisane i pomoże nam zaplanować aktywację miasta.</p>
            <a href="#top">Wróć na początek ↑</a>
          </div>
        ) : (
          <form className="join-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                Adres e-mail
                <input name="email" type="email" placeholder="ty@firma.pl" required />
              </label>
              <label>
                Miasto
                <select name="city" defaultValue="" required>
                  <option value="" disabled>Wybierz miasto</option>
                  <option>Kraków</option>
                  <option>Wrocław</option>
                  <option>Málaga</option>
                  <option>Inne miasto</option>
                </select>
              </label>
            </div>
            <div className="form-row">
              <label>
                Dzielnica / organizacja
                <input name="district" type="text" placeholder="np. Podgórze lub nazwa firmy" />
              </label>
              <label>
                Dołączam jako
                <select name="role" defaultValue="Kierowca" required>
                  <option>Kierowca</option>
                  <option>Lokalny ambasador</option>
                  <option>Partner / organizacja</option>
                  <option>Inwestor</option>
                </select>
              </label>
            </div>
            <label>
              Gdzie parkowanie jest dla Ciebie największym problemem?
              <textarea name="problem" placeholder="Opisz lokalizację, porę dnia lub konkretną sytuację" rows={3} />
            </label>
            <div className="form-row compact">
              <label>
                Ilu kierowców możesz zaprosić?
                <select name="referrals" defaultValue="0">
                  <option value="0">Na razie nie wiem</option>
                  <option value="1">1–3 osoby</option>
                  <option value="4">4–10 osób</option>
                  <option value="11">Ponad 10 osób</option>
                </select>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" name="ambassador" />
                <span>Chcę pomóc jako lokalny ambasador</span>
              </label>
            </div>
            {formStatus === "error" && (
              <p className="form-error" role="alert">Nie udało się zapisać zgłoszenia. Spróbuj ponownie.</p>
            )}
            <button type="submit" disabled={formStatus === "loading"}>
              {formStatus === "loading" ? "Zapisuję…" : "Dołącz do LOOPR"} <span>→</span>
            </button>
            <small>Zapisując się, zgadzasz się na kontakt dotyczący pilotażu LOOPR. Zero spamu.</small>
          </form>
        )}
      </section>

      <footer>
        <a href="#top" className="logo"><img src="/brand/loopr-logo-crop.png" alt="LOOPR" /></a>
        <p>Less chaos. More flow.</p>
        <div><a href="#jak-dziala">Produkt</a><a href="#miasta">Miasta</a><a href="#dla-inwestorow">Partnerzy</a><a href="#dolacz">Kontakt</a></div>
        <small>© 2026 LOOPR. Inteligentna synchronizacja parkingowa czasu rzeczywistego.</small>
      </footer>
    </main>
  );
}
