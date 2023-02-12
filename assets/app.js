;(() => {
  const body = document.body
  ;(put = (a, p) => a.forEach((e) => p.appendChild(e))),
    (make = (e, a = []) => (
      (x = document.createElement(e)), a.forEach((e) => x.classList.add(e)), x
    ))

  // split character input
  // copy button

  const copy = (copyText) => {
    copyText.select()
    copyText.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(copyText.value)
  }

  const topToolBar = make("div", ["toolbar"])

  const input = make("input")
  const textarea = make("textarea")
  const output = make("textarea", ["output"])
  const copyButton = make("button")

  const listOnline = make("input", ["checkbox", "list-only"])
  const listOnlineLabel = make("label")
  const shuffle = make("input", ["checkbox", "shuffle"])
  const shuffleLabel = make("label")
  const listNumbered = make("input", ["checkbox", "numbered"])
  const listNumberedLabel = make("label")
  const copyOnPaste = make("input", ["checkbox", "pastecopy"])
  const copyOnPasteLabel = make("label")

  shuffleLabel.innerText = "Shuffle"
  listOnlineLabel.innerText = "List only"
  listNumberedLabel.innerText = "Numbered list"
  copyOnPasteLabel.innerText = "Copy on paste"

  let lineSplit = ":"

  input.placeholder = lineSplit
  input.oninput = () => (lineSplit = input.value)

  listOnline.type = "checkbox"
  listNumbered.type = "checkbox"
  shuffle.type = "checkbox"
  copyOnPaste.type = "checkbox"

  copyButton.innerText = "Copy"

  textarea.oninput = () => {
    let lines
    let tempLines = textarea.value.split(/\n/)
    let outputValue = ""

    if (shuffle.checked) {
      lines = tempLines.sort((a, b) => 0.5 - Math.random())
    } else {
      lines = tempLines
    }

    const listStyle = (index = 0) => {
      if (listNumbered.checked) {
        return `${index + 1}.`
      } else {
        return "-"
      }
    }

    if (listOnline.checked) {
      lines.forEach((line, index) => {
        outputValue += `${listStyle(index)} ${line}\n`
      })
    } else {
      lines.forEach((line, index) => {
        let valueOne = line.slice(0, line.indexOf(lineSplit))
        let valueTwo = line.slice(line.indexOf(lineSplit) + 1)
        outputValue += `${listStyle(
          index
        )} **${valueOne}${lineSplit}**${valueTwo}\n`
      })
    }

    output.value = outputValue

    //
    if (copyOnPaste.checked) {
      copy(output)
    }
  }

  copyButton.addEventListener("click", () => copy(output))

  put(
    [
      input,
      listOnline,
      listOnlineLabel,
      listNumbered,
      listNumberedLabel,
      shuffle,
      shuffleLabel,
      copyOnPaste,
      copyOnPasteLabel,
    ],
    topToolBar
  )
  put([topToolBar, textarea, output, copyButton], body)
})()
