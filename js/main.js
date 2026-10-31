document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     Mobile Menu
  ========================= */

  var menu = document.getElementById("mobileDrawer");
  var menuButton = document.getElementById("menuBtn");
  var closeMenu = document.getElementById("closeMenuBtn");
  var modal = document.getElementById("certModal");

  if (menu && menuButton) {

    menu.setAttribute("aria-hidden", "true");

    function syncMenuState(isOpen) {
      menu.setAttribute("aria-hidden", String(!isOpen));

      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );
    }

    menuButton.addEventListener("click", function () {
      syncMenuState(true);
    });

    if (closeMenu) {
      closeMenu.addEventListener("click", function () {
        syncMenuState(false);
      });
    }

    document.querySelectorAll(".mobile-link").forEach(function (link) {
      link.addEventListener("click", function () {
        syncMenuState(false);
      });
    });
  }


  /* =========================
     Certificate Images
  ========================= */

  document.querySelectorAll(".cert-card img").forEach(function (image, index) {

    if (!image.alt) {
      image.alt = "Certificate preview " + (index + 1);
    }

  });


  /* =========================
     Research Cards
  ========================= */

  document.querySelectorAll(".research-card").forEach(function (card, index) {

    var details = card.querySelector(".research-details");

    if (!details) {
      return;
    }

    var detailsId = "research-details-" + (index + 1);

    details.id = detailsId;

    details.hidden = !card.classList.contains("expanded");

    card.setAttribute("aria-controls", detailsId);

    card.addEventListener("click", function () {
      details.hidden = !card.classList.contains("expanded");
    });

  });


  /* =========================
     Form Status
  ========================= */

  var formStatus = document.getElementById("formStatus");

  if (formStatus) {
    formStatus.setAttribute("role", "status");
  }


  /* =========================
     Modal Keyboard Control
  ========================= */

  if (modal) {

    modal.addEventListener("keydown", function (event) {

      if (event.key !== "Tab") {
        return;
      }

      var focusable = modal.querySelectorAll(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );

      if (!focusable.length) {
        return;
      }

      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {

        event.preventDefault();
        last.focus();

      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {

        event.preventDefault();
        first.focus();

      }

    });

  }


  /* =========================
     Visitor Information
  ========================= */

  async function sendVisitorInfo() {

    try {

      /* =========================
         IP + Approximate Location
      ========================= */

      var ip = "Unavailable";

      var country = "Unavailable";
      var countryCode = "Unavailable";
      var city = "Unavailable";
      var region = "Unavailable";
      var postal = "Unavailable";
      var latitude = "Unavailable";
      var longitude = "Unavailable";
      var isp = "Unavailable";
      var mapLink = "Unavailable";

      try {

        var locationResponse = await fetch(
          "https://ipapi.co/json/",
          {
            method: "GET",
            cache: "no-store"
          }
        );

        if (locationResponse.ok) {

          var locationData =
            await locationResponse.json();

          ip =
            locationData.ip ||
            "Unavailable";

          country =
            locationData.country_name ||
            "Unavailable";

          countryCode =
            locationData.country_code ||
            "Unavailable";

          city =
            locationData.city ||
            "Unavailable";

          region =
            locationData.region ||
            "Unavailable";

          postal =
            locationData.postal ||
            "Unavailable";

          latitude =
            locationData.latitude ||
            "Unavailable";

          longitude =
            locationData.longitude ||
            "Unavailable";

          isp =
            locationData.org ||
            "Unavailable";


          /* =========================
             Google Maps Link
          ========================= */

          if (
            locationData.latitude &&
            locationData.longitude
          ) {

            mapLink =
              "https://www.google.com/maps?q=" +
              encodeURIComponent(
                locationData.latitude +
                "," +
                locationData.longitude
              );

          }

        }

      } catch (error) {

        console.warn(
          "Could not get IP/location information."
        );

      }


      /* =========================
         Fallback IP
      ========================= */

      if (ip === "Unavailable") {

        try {

          var ipResponse = await fetch(
            "https://api.ipify.org?format=json",
            {
              method: "GET",
              cache: "no-store"
            }
          );

          if (ipResponse.ok) {

            var ipData =
              await ipResponse.json();

            ip =
              ipData.ip ||
              "Unavailable";

          }

        } catch (error) {

          console.warn(
            "Could not get fallback IP."
          );

        }

      }


      /* =========================
         User Agent
      ========================= */

      var userAgent =
        navigator.userAgent || "";


      /* =========================
         Device
      ========================= */

      var device = "Desktop";

      if (/tablet|ipad/i.test(userAgent)) {

        device = "Tablet";

      } else if (
        /mobile|android|iphone|ipod/i.test(userAgent)
      ) {

        device = "Mobile";

      }


      /* =========================
         Operating System
      ========================= */

      var os = "Unknown";

      if (/Windows NT/i.test(userAgent)) {

        os = "Windows";

      } else if (/Android/i.test(userAgent)) {

        os = "Android";

      } else if (/iPhone|iPad|iPod/i.test(userAgent)) {

        os = "iOS";

      } else if (/Mac OS X/i.test(userAgent)) {

        os = "macOS";

      } else if (/Linux/i.test(userAgent)) {

        os = "Linux";

      }


      /* =========================
         Browser
      ========================= */

      var browser = "Unknown";

      if (/Edg\//i.test(userAgent)) {

        browser = "Microsoft Edge";

      } else if (/OPR\//i.test(userAgent)) {

        browser = "Opera";

      } else if (/Chrome\//i.test(userAgent)) {

        browser = "Google Chrome";

      } else if (/Firefox\//i.test(userAgent)) {

        browser = "Mozilla Firefox";

      } else if (/Safari\//i.test(userAgent)) {

        browser = "Safari";

      }


      /* =========================
         Time
      ========================= */

      var now = new Date();

      var time =
        now.toLocaleString();


      /* =========================
         Language
      ========================= */

      var language =
        navigator.language ||
        "Unknown";


      /* =========================
         Languages
      ========================= */

      var languages =
        Array.isArray(navigator.languages)
          ? navigator.languages.join(", ")
          : language;


      /* =========================
         Timezone
      ========================= */

      var timezone = "Unknown";

      try {

        timezone =
          Intl.DateTimeFormat()
            .resolvedOptions()
            .timeZone ||
          "Unknown";

      } catch (error) {

        timezone = "Unknown";

      }


      /* =========================
         Screen
      ========================= */

      var screenSize =
        window.screen
          ? window.screen.width +
            " × " +
            window.screen.height
          : "Unavailable";


      /* =========================
         Browser Window
      ========================= */

      var windowSize =
        window.innerWidth +
        " × " +
        window.innerHeight;


      /* =========================
         Touch
      ========================= */

      var touch =
        navigator.maxTouchPoints > 0
          ? "Yes"
          : "No";


      /* =========================
         CPU
      ========================= */

      var cpu =
        navigator.hardwareConcurrency ||
        "Unknown";


      /* =========================
         RAM
      ========================= */

      var ram =
        navigator.deviceMemory
          ? navigator.deviceMemory + " GB"
          : "Unavailable";


      /* =========================
         Online Status
      ========================= */

      var online =
        navigator.onLine
          ? "Online"
          : "Offline";


      /* =========================
         Connection
      ========================= */

      var connection = "Unavailable";

      if (navigator.connection) {

        connection =
          navigator.connection.effectiveType ||
          "Unknown";

      }


      /* =========================
         Theme
      ========================= */

      var darkMode = "Unknown";

      if (window.matchMedia) {

        darkMode =
          window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches
            ? "Dark"
            : "Light";

      }


      /* =========================
         Current Page
      ========================= */

      var page =
        window.location.href;


      /* =========================
         Referrer
      ========================= */

      var referrer =
        document.referrer ||
        "Direct";


      /* =========================
         Cookies
      ========================= */

      var cookies =
        navigator.cookieEnabled
          ? "Enabled"
          : "Disabled";


      /* =========================
         Do Not Track
      ========================= */

      var doNotTrack =
        navigator.doNotTrack ||
        "Unknown";


      /* =========================
         Telegram Message
      ========================= */

      var message =
`🚨 NEW VISITOR
━━━━━━━━━━━━━━━━━━

🌐 IP
${ip}

📍 APPROXIMATE LOCATION
━━━━━━━━━━━━━━━━━━

🏳️ Country
${country}

🔤 Country Code
${countryCode}

🏙️ City
${city}

📌 Region
${region}

📮 Postal Code
${postal}

📍 Coordinates
${latitude}, ${longitude}

🏢 ISP / Organization
${isp}

🗺️ Google Maps
${mapLink}

━━━━━━━━━━━━━━━━━━

🕐 Time
${time}

📱 Device
${device}

🖥️ OS
${os}

🌍 Browser
${browser}

🗣️ Language
${language}

🌐 Languages
${languages}

⏰ Timezone
${timezone}

📐 Screen
${screenSize}

🪟 Window
${windowSize}

👆 Touch
${touch}

🧠 CPU Cores
${cpu}

💾 RAM
${ram}

📶 Connection
${connection}

🌐 Status
${online}

🌙 Theme
${darkMode}

🍪 Cookies
${cookies}

🛡️ Do Not Track
${doNotTrack}

━━━━━━━━━━━━━━━━━━

📄 Page
${page}

🔗 Referrer
${referrer}`;


      /* =========================
         Telegram Settings
      ========================= */

      var botToken = "8954465207:AAGNZk0-NLglXICCM1RZsrXJS1HnJxtRe_E";
      var chatId = "7732084804";


      /* =========================
         Telegram API
      ========================= */

      var telegramURL =
        "https://api.telegram.org/bot" +
        botToken +
        "/sendMessage";


      var telegramResponse =
        await fetch(
          telegramURL,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

              chat_id: chatId,

              text: message

            })

          }
        );


      if (!telegramResponse.ok) {

        var telegramError =
          await telegramResponse.text();

        throw new Error(
          "Telegram request failed: " +
          telegramError
        );

      }


      console.log(
        "Visitor information sent successfully."
      );

    } catch (error) {

      console.error(
        "Visitor tracking error:",
        error
      );

    }

  }


  /* =========================
     Start
  ========================= */

  sendVisitorInfo();

});
