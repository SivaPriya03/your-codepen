const defaultHTML = `<h1> Home Page </h1>`
export default function(html = defaultHTML, styles = '', jsContent = '') {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>App</title>
      <style>
        ${styles}
      </style>
  </head>
  <body>
  ${html}
  <script>
    ${jsContent}
  </script>
  </body>
  </html>`
}
