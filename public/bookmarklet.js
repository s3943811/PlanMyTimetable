/**
 * This script creates a popover window to select a semester and then fetches class data based on the selected semester.
 * The fetched data is processed and encoded before redirecting to a website with the encoded data.
 * The script also includes helper functions for swapping characters and crushing strings.
 */
(() => {
  let semester;
  const semesters = Object.keys(window.data.student.student_enrolment_sem);
  let classes = [];

  const createWindow = async () => {
    // create popover to select semester
    let container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.right = "0";
    container.style.bottom = "0";
    container.style.background = "rgba(0, 0, 0, 0.5)";
    container.style.zIndex = "1000";
    container.style.display = "flex";
    container.style.justifyContent = "space-around";
    container.style.alignItems = "center";

    let loader = document.createElement("div");
    loader.style.padding = "5%";
    loader.style.display = "flex";
    loader.style.flexDirection = "column";
    loader.textContent = "Choose a semester: ";
    loader.style.background = "white";
    loader.style.fontFamily = "sans-serif";

    let form = document.createElement("form");
    form.style.background = "white";
    form.style.fontFamily = "sans-serif";

    // add semester radio buttons
    for (const [index, value] of semesters.entries()) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "semester";
      radio.value = index;
      radio.checked = index === 0;
      radio.id = value;
      let label = document.createElement("label");
      let span = document.createElement("span");
      span.innerHTML = value;
      label.appendChild(span);
      form.appendChild(label);
      form.appendChild(radio);
    }

    // create button and function run on click of button
    let submit = document.createElement("button");
    submit.textContent = "Next";
    submit.addEventListener("click", function (event) {
      // Prevent the form from being submitted
      event.preventDefault();

      // Get the value of the selected radio button
      semester = document.querySelector('input[name="semester"]:checked').value;

      // Log the selected value
      form.remove();
      loader.textContent = "Loading your timetable data...";
      run(
        () => container.remove(),
        (message) => {
          loader.innerText = message;
        },
      );
    });
    form.appendChild(submit);
    loader.appendChild(form);

    container.append(loader);
    document.body.append(container);
  };

  const selectType = (type) => {
    switch (type) {
      case "Lecture":
        return 0;
      case "Lectorial":
        return 0;
      case "Tutorial":
        return 1;
      case "Workshop":
        return 2;
      case "Practical":
        return 3;
      default:
        return 4;
    }
  };

  /**
   * Runs the bookmarklet code.
   *
   * @param {Function} close - The function to close the bookmarklet.
   * @param {Function} update - The function to update the bookmarklet.
   * @returns {Promise<void>} - A promise that resolves when the bookmarklet code is executed successfully.
   */
  const run = async (close, update) => {
    try {
      // get all class data
      classes = await Promise.all(
        Object.values(
          window.data.student.student_enrolment_sem[semesters[semester]],
        ).map(async (course, index) => {
          return Promise.all(
            Object.values(course.groups).map(async (group) => {
              console.log(
                `Downloading group ${course.description} - ${group.activity_group_code}`,
              );
              const url = new URL(window.location.href);
              const token = url.searchParams.get("ss");

              const path_base = window.location.pathname
                .split("/")
                .slice(0, -1)
                .join("/");

              // create url to fetch data from
              const fetchUrl = new URL(
                `${url.origin}${path_base}/rest/student/${
                  window.data.student.student_code
                }/subject/${course.subject_code}/group/${
                  group.activity_group_code
                }/activities/?${"ss"}=${token}`,
              );

              // fetch individual class data
              const request = await fetch(fetchUrl);

              if (request.status === 200) {
                let data = await request.json();
                // create object for class
                const classs = {
                  id: nanoid(),
                  title: course.description,
                  courseCode: course.callista_code ?? subject_code,
                  type: selectType(Object.values(data)[0].activityType),
                  colour: index,
                  options: Object.values(data).map((item) => ({
                    day: item.day_of_week,
                    start: item.start_time,
                    duration: item.duration,
                    location: item.location,
                    campus_description: item.campus_description,
                  })),
                };
                return classs;
              } else {
                throw "Problem retreiving data. Please refresh the page and try again. If the problem persists, please open a new issue on Github.";
              }
            }),
          );
        }),
      );
      classes = classes.flat();
      // encode and redirect to site
      const encoded = encodeURIComponent(crush(JSON.stringify(classes)));
      window
        .open(`https://planmytimetable.vercel.app/?state=${encoded}`)
        .focus();
      close();
    } catch (e) {
      update(e);
    }
  };

  createWindow();

  // function nanoid from https://zelark.github.io/nano-id-cc/
  // Copyright 2017 Andrey Sitnik <andrey@sitnik.ru>

  // Permission is hereby granted, free of charge, to any person obtaining a copy of
  // this software and associated documentation files (the "Software"), to deal in
  // the Software without restriction, including without limitation the rights to
  // use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
  // the Software, and to permit persons to whom the Software is furnished to do so,
  // subject to the following conditions:

  // The above copyright notice and this permission notice shall be included in all
  // copies or substantial portions of the Software.

  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
  // FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
  // COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
  // IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  // CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  const nanoid = (t = 21) =>
    crypto
      .getRandomValues(new Uint8Array(t))
      .reduce(
        (t, e) =>
          (t +=
            (e &= 63) < 36
              ? e.toString(36)
              : e < 62
              ? (e - 26).toString(36).toUpperCase()
              : e > 62
              ? "-"
              : "_"),
        "",
      );

  // function JSONCrushSwap and Crush are from:
  // JSONCrush v1.1.6 by Frank Force - https://github.com/KilledByAPixel/JSONCrush
  // full credit to Frank Force for this wonderful package.
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //   MIT License

  // Copyright (c) 2019 Frank Force

  // Permission is hereby granted, free of charge, to any person obtaining a copy
  // of this software and associated documentation files (the "Software"), to deal
  // in the Software without restriction, including without limitation the rights
  // to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  // copies of the Software, and to permit persons to whom the Software is
  // furnished to do so, subject to the following conditions:

  // The above copyright notice and this permission notice shall be included in all
  // copies or substantial portions of the Software.

  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  // SOFTWARE.

  const JSONCrushSwap = (string, forward = 1) => {
    // swap out characters for lesser used ones that wont get escaped
    const swapGroups = [
      ['"', "'"],
      ["':", "!"],
      [",'", "~"],
      ["}", ")", "\\", "\\"],
      ["{", "(", "\\", "\\"],
    ];

    const swapInternal = (string, g) => {
      let regex = new RegExp(
        `${(g[2] ? g[2] : "") + g[0]}|${(g[3] ? g[3] : "") + g[1]}`,
        "g",
      );
      return string.replace(regex, ($1) => ($1 === g[0] ? g[1] : g[0]));
    };

    // need to be able to swap characters in reverse direction for uncrush
    if (forward)
      for (let i = 0; i < swapGroups.length; ++i)
        string = swapInternal(string, swapGroups[i]);
    else
      for (let i = swapGroups.length; i--; )
        string = swapInternal(string, swapGroups[i]);

    return string;
  };
  const crush = (string, maxSubstringLength = 50) => {
    const delimiter = "\u0001"; // used to split parts of crushed string
    const JSCrush = (string, replaceCharacters) => {
      // JSCrush Algorithm (repleace repeated substrings with single characters)
      let replaceCharacterPos = replaceCharacters.length;
      let splitString = "";

      const ByteLength = (string) =>
        encodeURI(encodeURIComponent(string)).replace(/%../g, "i").length;
      const HasUnmatchedSurrogate = (string) => {
        // check ends of string for unmatched surrogate pairs
        let c1 = string.charCodeAt(0);
        let c2 = string.charCodeAt(string.length - 1);
        return (c1 >= 0xdc00 && c1 <= 0xdfff) || (c2 >= 0xd800 && c2 <= 0xdbff);
      };

      // count instances of substrings
      let substringCount = {};
      for (
        let substringLength = 2;
        substringLength < maxSubstringLength;
        substringLength++
      )
        for (let i = 0; i < string.length - substringLength; ++i) {
          let substring = string.substr(i, substringLength);

          // don't recount if already in list
          if (substringCount[substring]) continue;

          // prevent breaking up unmatched surrogates
          if (HasUnmatchedSurrogate(substring)) continue;

          // count how many times the substring appears
          let count = 1;
          for (
            let substringPos = string.indexOf(substring, i + substringLength);
            substringPos >= 0;
            ++count
          )
            substringPos = string.indexOf(
              substring,
              substringPos + substringLength,
            );

          // add to list if it appears multiple times
          if (count > 1) substringCount[substring] = count;
        }

      while (true) {
        // loop while string can be crushed more
        // get the next character that is not in the string
        for (
          ;
          replaceCharacterPos-- &&
          string.includes(replaceCharacters[replaceCharacterPos]);

        ) {}
        if (replaceCharacterPos < 0) break; // ran out of replacement characters
        let replaceCharacter = replaceCharacters[replaceCharacterPos];

        // find the longest substring to replace
        let bestSubstring;
        let bestLengthDelta = 0;
        let replaceByteLength = ByteLength(replaceCharacter);
        for (let substring in substringCount) {
          // calculate change in length of string if it substring was replaced
          let count = substringCount[substring];
          let lengthDelta =
            (count - 1) * ByteLength(substring) -
            (count + 1) * replaceByteLength;
          if (!splitString.length) lengthDelta -= ByteLength(delimiter); // include the delimiter length
          if (lengthDelta <= 0) delete substringCount[substring];
          else if (lengthDelta > bestLengthDelta) {
            bestSubstring = substring;
            bestLengthDelta = lengthDelta;
          }
        }
        if (!bestSubstring) break; // string can't be compressed further

        // create new string with the split character
        string =
          string.split(bestSubstring).join(replaceCharacter) +
          replaceCharacter +
          bestSubstring;
        splitString = replaceCharacter + splitString;

        // update substring count list after the replacement
        let newSubstringCount = {};
        for (let substring in substringCount) {
          // make a new substring with the replacement
          let newSubstring = substring
            .split(bestSubstring)
            .join(replaceCharacter);

          // count how many times the new substring appears
          let count = 0;
          for (let i = string.indexOf(newSubstring); i >= 0; ++count)
            i = string.indexOf(newSubstring, i + newSubstring.length);

          // add to list if it appears multiple times
          if (count > 1) newSubstringCount[newSubstring] = count;
        }
        substringCount = newSubstringCount;
      }

      return { a: string, b: splitString };
    };

    // create a string of replacement characters
    let characters = [];

    // prefer replacing with characters that will not be escaped by encodeURIComponent
    const unescapedCharacters = `-_.!~*'()`;
    for (let i = 127; --i; ) {
      if (
        (i >= 48 && i <= 57) || // 0-9
        (i >= 65 && i <= 90) || // A-Z
        (i >= 97 && i <= 122) || // a-z
        unescapedCharacters.includes(String.fromCharCode(i))
      )
        characters.push(String.fromCharCode(i));
    }

    // pick from extended set last
    for (let i = 32; i < 255; ++i) {
      let c = String.fromCharCode(i);
      if (c != "\\" && !characters.includes(c)) characters.unshift(c);
    }

    // remove delimiter if it is found in the string
    string = string.replace(new RegExp(delimiter, "g"), "");

    // swap out common json characters
    string = JSONCrushSwap(string);

    // crush with JS crush
    const crushed = JSCrush(string, characters);

    // insert delimiter between JSCrush parts
    let crushedString = crushed.a;
    if (crushed.b.length) crushedString += delimiter + crushed.b;

    // fix issues with some links not being recognized properly
    crushedString += "_";

    // return crushed string
    return crushedString;
  };
})();
