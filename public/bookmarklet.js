import JSONCrush from "jsoncrush";

(() => {
  let semester;
  const semesters = Object.keys(window.data.student.student_enrolment_sem);
  let classes = [];

  const createWindow = async () => {
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
    let submit = document.createElement("button");
    submit.textContent = "Next";
    submit.addEventListener("click", function (event) {
      // Prevent the form from being submitted
      event.preventDefault();

      // Get the value of the selected radio button
      semester = document.querySelector('input[name="semester"]:checked').value;

      // Log the selected value
      // console.log(semester);
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

  const run = async (close, update) => {
    try {
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

              const fetchUrl = new URL(
                `${url.origin}${path_base}/rest/student/${
                  window.data.student.student_code
                }/subject/${course.subject_code}/group/${
                  group.activity_group_code
                }/activities/?${"ss"}=${token}`,
              );

              const request = await fetch(fetchUrl);

              if (request.status === 200) {
                let data = await request.json();
                const classs = {
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
      const encoded = encodeURIComponent(JSONCrush(JSON.stringify(classes)));
      window.open(`localhost:3000/?state=${encoded}`).focus();
      close();
    } catch (e) {
      update(e);
    }
  };

  createWindow();
})();
