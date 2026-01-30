\# 🕵️ Dev Detective – GitHub Profile \& Battle App



\## 📸 Project Preview



\### Normal Mode – Profile Search



!\\\[Profile Search](assets/profile.png)







\### Battle Mode – Developer Comparison



!\\\[Battle Mode](assets/battle.png)



---



A \*\*GitHub Profile Search \& Comparison App\*\* built as part of \*\*Weekly Assignment 3\*\* during the \*\*Prodesk IT Internship\*\*.



This project focuses on real-world frontend fundamentals such as \*\*API integration\*\*, \*\*async/await\*\*, \*\*error handling\*\*, and \*\*UI state management\*\* using vanilla JavaScript.



---



\## 🚀 Features



\### ✅ Level 1 – Core Functionality



\- Search any GitHub user by username

\- Fetches real-time data from GitHub API

\- Displays:

&nbsp; - Avatar

&nbsp; - Name \& username

&nbsp; - Bio

&nbsp; - Location

&nbsp; - GitHub profile link

\- Handles:

&nbsp; - Loading state during fetch

&nbsp; - User not found (404) errors gracefully



---



\### ✅ Level 2 – Repository Insights



\- Fetches repositories using `repos\_url`

\- Displays \*\*top 5 latest repositories\*\*

\- Repository names are clickable (open in new tab)

\- Repository dates formatted into human-readable form  

&nbsp; \*(e.g. `25 Jan 2023`)\*



---



\### ✅ Level 3 – Advanced Battle Mode



\- Toggle between \*\*Normal Mode\*\* and \*\*Battle Mode\*\*

\- Compare \*\*two GitHub users simultaneously\*\*

\- Uses `Promise.all` for parallel API calls

\- Comparison based on \*\*followers count\*\*

\- Displays:

&nbsp; - Compact battle cards

&nbsp; - User avatars

&nbsp; - Followers count

\- Visual verdict:

&nbsp; - 🟢 Winner

&nbsp; - 🔴 Loser

&nbsp; - 🤝 Draw

\- Includes:

&nbsp; - Loading state during battle

&nbsp; - Error handling for invalid usernames

&nbsp; - Keyboard support (Enter key to compare)



---



\## 🧠 Key Design Decisions



\- API calls are handled using \*\*async/await\*\*

\- Battle Mode and Normal Mode are \*\*strictly separated\*\*

\- Parallel API fetching used for better performance

\- Compact UI used in Battle Mode to focus on comparison

\- Error states handled without breaking the UI

\- Desktop-first design (mobile responsiveness optional)



---



\## 📂 Project Structure



```text

dev-detective/

│

├── index.html

├── style.css

├── script.js

├── assets/

│   ├── profile.png

│   └── battle.png

|    └── bg.png

├── README.md

└── prompts.md



\\## 🛠️ Technologies Used





\\\* \\\*\\\*HTML5\\\*\\\*



\\\* \\\*\\\*Modern CSS\\\*\\\* (CSS variables, responsive layout)



\\\* \\\*\\\*JavaScript (ES6+)\\\*\\\*



\\\* \\\*\\\*GitHub REST API\\\* \\\*



(No frameworks or external libraries used)







---







\\## 🧪 How to Run the Project



1\\.Clone the repository



2\\.Open index.html in a browser



3\\.Search a GitHub username in Normal Mode



4\\.Switch to Battle Mode to compare two users



(No backend or build tools required)







---









\\## 🤖 AI Assistance Disclaimer



AI tools were used \\\*\\\*only for guidance and explanations\\\*\\\*, such as:



\\\*Understanding API flow and async behavior



\\\*Planning feature implementation



\\\*Debugging logical and UI issues



\\\*Learning best practices for state management







All code was written, adapted, and debugged manually after understanding the concepts.







Detailed usage is documented in prompts.md.







---











\\## 👨‍💻 Author







\\\*\\\*Krishna Kumar\\\*\\\*



Intern – Prodesk IT







---



