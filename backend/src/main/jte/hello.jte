@param adapters.hello.HelloPageData pageData
@param adapters.Localizer localizer

<html lang="en">
<body>
<p>${localizer.localize("hello.visitor")}</p>
<p hx-post="/clicked" hx-swap="outerHTML">${localizer.localize("hello.user-of-the-day", pageData.userName, pageData.userKarma)}</p>
<script type="text/javascript" src="/webjars/htmx.org/1.9.6/dist/htmx.min.js"></script>
</body>
</html>