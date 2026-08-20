/* ==========================================================================
   Ger, Electrician — North Kildare
   All of the site's JavaScript. No dependencies, no third-party requests.
   Nothing here is required to read the site or to make a call: every phone
   number is a plain `tel:` link and the enquiry form falls back to a normal
   HTML submission if this file never runs.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Where the enquiry form goes.

     null  -> the form composes an email in the visitor's own mail app.
              No server, no third party, no data leaves the device until
              the visitor presses send themselves.

     "https://..." -> the form POSTs the fields as JSON to that URL
              (Formspree, Netlify Forms, a small serverless function).
              Set this and nothing else needs to change.

     See README.md before changing this.
     ------------------------------------------------------------------ */
  var FORM_ENDPOINT = null;

  /* ------------------------------------------------------------------
     Analytics

     No analytics tool is installed and no cookies are set. Every call to
     action carries data-cta ("call" or "quote") and data-cta-location.
     The three PRD 29 events are pushed to window.dataLayer if something
     defines it; if nothing does, this is a no-op.
     ------------------------------------------------------------------ */
  function track(event, detail) {
    if (!window.dataLayer || typeof window.dataLayer.push !== "function") return;
    var payload = { event: event };
    for (var key in detail) {
      if (Object.prototype.hasOwnProperty.call(detail, key)) {
        payload[key] = detail[key];
      }
    }
    window.dataLayer.push(payload);
  }

  document.addEventListener("click", function (e) {
    var el = e.target.closest ? e.target.closest("[data-cta]") : null;
    if (!el) return;
    var kind = el.getAttribute("data-cta");
    if (kind !== "call" && kind !== "quote") return;
    track(kind === "call" ? "phone_click" : "quote_click", {
      location: el.getAttribute("data-cta-location") || "unknown"
    });
  });

  /* ------------------------------------------------------------------
     Current year in the footer
     ------------------------------------------------------------------ */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ------------------------------------------------------------------
     Enquiry form
     ------------------------------------------------------------------ */
  var form = document.querySelector("[data-enquiry-form]");
  if (!form) return;

  var status = document.querySelector("[data-form-status]");
  var summary = form.querySelector("[data-error-summary]");

  /* Take validation off the browser only once we know this script runs.
     Without JavaScript the native required/type checks still apply. */
  form.setAttribute("novalidate", "novalidate");

  function fieldOf(input) {
    return input.closest(".field") || input.parentNode;
  }

  function errorNodeFor(input) {
    var field = fieldOf(input);
    return field ? field.querySelector(".field__err") : null;
  }

  function setError(input, message) {
    var node = errorNodeFor(input);
    input.setAttribute("aria-invalid", "true");
    if (node) {
      node.textContent = message;
      if (node.id) input.setAttribute("aria-describedby", node.id);
    }
  }

  function clearError(input) {
    var node = errorNodeFor(input);
    input.removeAttribute("aria-invalid");
    if (node) node.textContent = "";
  }

  /* A deliberately forgiving phone check: Irish numbers get written a
     dozen different ways and rejecting a real one costs an enquiry. */
  function looksLikePhone(value) {
    var digits = value.replace(/[^\d]/g, "");
    return digits.length >= 7 && digits.length <= 15;
  }

  function looksLikeEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  }

  function validate() {
    var problems = [];

    Array.prototype.forEach.call(
      form.querySelectorAll("input, select, textarea"),
      function (input) {
        if (input.type === "hidden" || input.name === "company") return;
        clearError(input);

        var value = (input.value || "").trim();
        var label = input.getAttribute("data-label") || input.name;

        if (input.hasAttribute("required") && value === "") {
          setError(input, "Please fill in your " + label.toLowerCase() + ".");
          problems.push(input);
          return;
        }
        if (input.name === "phone" && value !== "" && !looksLikePhone(value)) {
          setError(input, "That does not look like a phone number.");
          problems.push(input);
          return;
        }
        if (input.name === "email" && value !== "" && !looksLikeEmail(value)) {
          setError(input, "That does not look like an email address.");
          problems.push(input);
        }
      }
    );

    return problems;
  }

  function composeBody(data) {
    var lines = [
      "Name: " + data.name,
      "Phone: " + data.phone,
      "Email: " + (data.email || "not given"),
      "Town or area: " + data.location,
      "Work needed: " + data.work,
      "",
      "Message:",
      data.message || "(none)"
    ];
    return lines.join("\n");
  }

  function showSuccess(heading, message) {
    if (!status) return;
    status.innerHTML = "";

    var h = document.createElement("h3");
    h.textContent = heading;
    var p = document.createElement("p");
    p.textContent = message;

    status.appendChild(h);
    status.appendChild(p);
    status.className = "form__status";
    status.hidden = false;
    form.hidden = true;
    status.setAttribute("tabindex", "-1");
    status.focus();
  }

  form.addEventListener("submit", function (e) {
    var problems = validate();

    if (problems.length) {
      e.preventDefault();
      if (summary) {
        summary.textContent =
          problems.length === 1
            ? "One field needs your attention."
            : problems.length + " fields need your attention.";
        summary.hidden = false;
      }
      problems[0].focus();
      return;
    }

    if (summary) {
      summary.textContent = "";
      summary.hidden = true;
    }

    /* Honeypot: a real person never fills this in. Fail silently so a bot
       cannot tell it was caught. */
    var honey = form.querySelector('[name="company"]');
    if (honey && honey.value !== "") {
      e.preventDefault();
      showSuccess("Thanks", "Your enquiry has been noted.");
      return;
    }

    var data = {};
    Array.prototype.forEach.call(
      form.querySelectorAll("input, select, textarea"),
      function (input) {
        if (input.name && input.name !== "company") {
          data[input.name] = (input.value || "").trim();
        }
      }
    );

    track("form_submit", { location: "contact" });

    if (FORM_ENDPOINT) {
      e.preventDefault();
      var button = form.querySelector('button[type="submit"]');
      if (button) {
        button.disabled = true;
        button.textContent = "Sending…";
      }

      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed");
          showSuccess(
            "Thanks — your enquiry has been sent.",
            "Ger has your details and will be in touch. If it is urgent, ring him directly on the number above."
          );
        })
        .catch(function () {
          if (button) {
            button.disabled = false;
            button.textContent = "Send enquiry";
          }
          if (summary) {
            summary.textContent =
              "Sorry — that did not send. Please ring Ger on the number above.";
            summary.hidden = false;
            summary.focus();
          }
        });
      return;
    }

    /* No endpoint configured: hand the enquiry to the visitor's mail app.
       The confirmation says exactly that, because nothing has been sent
       yet and claiming otherwise would be untrue. */
    e.preventDefault();
    var to = form.getAttribute("data-mailto") || "";
    var subject = "Website enquiry — " + (data.work || "electrical work");
    window.location.href =
      "mailto:" +
      to +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(composeBody(data));

    showSuccess(
      "Your email is ready to send.",
      "Your enquiry has opened in your email app — press send there to deliver it to Ger. If nothing opened, ring him on the number above instead."
    );
  });

  /* Clear a field's error as soon as the visitor starts fixing it. */
  form.addEventListener("input", function (e) {
    if (e.target.getAttribute("aria-invalid") === "true") clearError(e.target);
  });
})();
