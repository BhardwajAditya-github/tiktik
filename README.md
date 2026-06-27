# TickTick

A customizable exam workspace builder for mock tests and competitive exam preparation.

TickTick allows you to build your own exam interface by arranging widgets such as a PDF viewer, timer, sections panel, and current section tracker. Once configured, you can preview the layout and start the exam in a distraction-free fullscreen mode.

Live at https://tiktik-bay-two.vercel.app/

---

## Features

### Builder Mode

* Upload your question paper (PDF)
* Add widgets to the canvas
* Drag & resize widgets
* Customize your exam layout
* Live preview before starting the exam
* Automatic layout persistence

### Exam Mode

* Fullscreen distraction-free experience
* Same layout as configured in Builder Mode
* Running countdown timer
* Section-wise timing support
* Automatic section switching
* Bell notification on section completion
* Current section indicator
* Exit exam anytime

---

## Widgets

### PDF Viewer

* Displays uploaded PDF
* Supports scrolling
* Built-in zoom controls
* Uses PDF.js

### Timer

* Overall exam countdown
* Automatically calculated from section durations

### Sections

Displays:

* Section order
* Completed sections
* Current active section

Supports configuring:

* Section names
* Order
* Duration
* Sectional timing

### Current Section

Shows the currently active section during the exam.

---

## Sectional Timing

Enable sectional timing and configure:

* Reasoning
* General Awareness
* Quantitative Aptitude
* English

Each section can have its own duration.

When a section finishes:

* Bell rings
* Section is marked complete
* Current section updates automatically

---

## Persistence

The application automatically saves:

* Widget positions
* Widget sizes
* Added widgets
* Section names
* Section order
* Section timings
* Canvas zoom

No Save button is required.

Current exam state is **not** persisted.

> **Note:** Uploaded PDFs are not persisted yet and need to be re-uploaded after a page refresh.

---

## Tech Stack

* Next.js
* React
* TypeScript
* Tailwind CSS
* Zustand
* React RND
* PDF.js
* @react-pdf-viewer/core

---

## Installation

```bash
git clone https://github.com/your-username/ticktick.git

cd ticktick

npm install

npm run dev
```

Open:

```
http://localhost:3000
```

---

## Usage

1. Upload a PDF from the left sidebar.
2. Add widgets from the widget library.
3. Arrange and resize widgets.
4. Configure section timings (optional).
5. Click **Preview** to review the layout.
6. Click **Start Exam** to begin the mock test.

---

## Roadmap

* PDF persistence using IndexedDB
* Multiple saved layouts
* Dark mode
* Keyboard shortcuts
* Question bookmarking
* Notes widget
* Stopwatch widget
* Progress tracker
* Exam analytics
* Cloud sync
* Import/Export layouts

---

## Project Structure

```
app/
modules/
  builder/
  canvas/
  exam/
  preview/
  widgets/
store/
lib/
public/
```

---

## Contributing

Contributions, feature requests, and bug reports are welcome.

Feel free to open an issue or submit a pull request.

---

## License

MIT License
