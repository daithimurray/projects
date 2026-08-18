/* Ger, electrician, North Kildare.
   The only JavaScript on the site. Nothing here is required to read a page,
   find the phone number, or place a call: every link works with JS disabled.
   It does two jobs, and both degrade cleanly.

   1. Quote form. Validates in the page, then composes the enquiry as a
      mailto: message. Chosen over a hosted form service so the site has no
      backend, no third party endpoint and no spam surface. The cost is that
      it depends on the visitor having a mail client, which is why the
      contact page always shows the phone number and the email address as
      plain selectable text beside the form.

   2. Conversion events. Fires the three events named in PRD section 29
      through one delegated listener. Nothing is sent anywhere until an
      analytics tool is installed and defines window.dataLayer.
*/
(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     Conversion events: phone_click, quote_click, form_submit
     --------------------------------------------------------------------- */

  function track(name, detail) {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(Object.assign({ event: name }, detail || {}));
    }
  }

  document.addEventListener(
    "click",
    function (event) {
      var el = event.target.closest("[data-cta]");
      if (!el) return;
      var kind = el.getAttribute("data-cta");
      var where = el.getAttribute("data-cta-location") || "unknown";
      if (kind === "call") track("phone_click", { location: where });
      if (kind === "quote") track("quote_click", { location: where });
    },
    { passive: true }
  );

  /* ---------------------------------------------------------------------
     Quote form
     --------------------------------------------------------------------- */

  var form = document.querySelector("[data-quote-form]");
  if (!form) return;

  var status = form.querySelector("[data-form-status]");
  var statusText = form.querySelector("[data-form-status-text]");
  var recipient = form.getAttribute("data-mailto");

  function fieldOf(control) {
    return control.closest(".field");
  }

  function messageFor(control) {
    if (control.validity.valueMissing) {
      return control.getAttribute("data-msg-required") || "This is required.";
    }
    if (control.validity.typeMismatch || control.validity.patternMismatch) {
      return control.getAttribute("data-msg-invalid") || "Check this entry.";
    }
    return "Check this entry.";
  }

  function setError(control, message) {
    var field = fieldOf(control);
    if (!field) return;
    var slot = field.querySelector("[data-error]");
    field.setAttribute("data-invalid", "true");
    control.setAttribute("aria-invalid", "true");
    if (slot) slot.querySelector("span").textContent = message;
  }

  function clearError(control) {
    var field = fieldOf(control);
    if (!field) return;
    field.removeAttribute("data-invalid");
    control.removeAttribute("aria-invalid");
  }

  /* Re-validate a field once the visitor has been told it is wrong, so the
     error clears as soon as they fix it rather than on the next submit. */
  form.addEventListener("input", function (event) {
    var control = event.target;
    if (!control.name) return;
    var field = fieldOf(control);
    if (field && field.getAttribute("data-invalid") === "true" && control.checkValidity()) {
      clearError(control);
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    /* Honeypot. A real visitor never sees this field, so anything in it is
       a bot. Fail silently rather than telling it why. */
    var trap = form.querySelector('[name="company"]');
    if (trap && trap.value) return;

    var controls = Array.prototype.slice.call(
      form.querySelectorAll("input[name], select[name], textarea[name]")
    );
    var firstBad = null;

    controls.forEach(function (control) {
      if (control.name === "company") return;
      if (control.checkValidity()) {
        clearError(control);
      } else {
        setError(control, messageFor(control));
        if (!firstBad) firstBad = control;
      }
    });

    if (firstBad) {
      if (status) status.setAttribute("data-open", "false");
      firstBad.focus();
      return;
    }

    var read = function (name) {
      var el = form.elements[name];
      return el && el.value ? el.value.trim() : "";
    };

    var name = read("name");
    var phone = read("phone");
    var email = read("email");
    var town = read("town");
    var work = read("work");
    var message = read("message");

    var lines = [
      "Name: " + name,
      "Phone: " + phone,
      "Email: " + (email || "not given"),
      "Town: " + town,
      "Work needed: " + work,
      "",
      message || "(no additional detail)"
    ];

    var href =
      "mailto:" +
      recipient +
      "?subject=" +
      encodeURIComponent("Quote request from " + name + ", " + town) +
      "&body=" +
      encodeURIComponent(lines.join("\n"));

    track("form_submit", { location: "contact" });

    /* Hand the message to the visitor's mail client. We cannot observe
       whether it opened, so the confirmation says what actually happened
       and repeats the fallbacks rather than claiming the message was sent
       or promising a reply time, which PRD 19.5 forbids. */
    window.location.href = href;

    if (status && statusText) {
      statusText.textContent =
        "Your email app should now be open with this enquiry ready to send. " +
        "It is not sent until you press send there. If nothing opened, " +
        "ring Ger instead or email " + recipient + " directly.";
      status.setAttribute("data-open", "true");
      status.focus();
    }
  });
})();

/* Keep the footer year current without a build step. */
(function () {
  var el = document.getElementById("yr");
  if (el) el.textContent = String(new Date().getFullYear());
})();
