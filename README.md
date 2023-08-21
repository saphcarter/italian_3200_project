# **Scoring Oral Skills**

This project has a two-fold aim. On one hand, it aims at providing students of Italian from the beginners stream a way of monitoring their progress in the area of pronunciation and fluency. On the other, it is meant to provide data for the investigation of whether repetition of strings of words impacts the learning of pronunciation and fluency in Italian, and whether an innovative way of receiving feedback motivates students in their learning.
The project involves the development of an application that will allow students to engage in the following sequence of tasks:

- students listen to authentic Italian audio
- students repeat what they hear
- students evaluate how close they think their input is to the original
- students are being scored through the use of audio similarity APIs to compute a similarity score, which can be compared with the students own evaluation.

## Setting up dev environment

### File structure

```
italian_3200_project/
|—— application/
│   |—— backend/
|   |   |——— venv/
│   |   └——— server.py (this contains our server paths)
│   |—— src
|   |	  |——— App.jsx (Homepage)
|   |	  └——— main.jsx (createRoot)
│   │── index.html (runs main.jsx file)
│   |── package.json
|   └—— vite.confis.js (create web sockets for server here)
│—— documentation/
|—— .gitignore
└—— README.md
```

### Running localhost and backend server

Open terminal and go to backend  
`$ cd italian_3200_project/application/backend `

Set up venv (you may need to add python to your path variable)  
`/backend $ python3 -m venv venv`
`/backend $ source venv/bin/activate`

Terminal should look like this  
`(venv) $ _ `

Install backend environment  
`(venv) $ pip install flask python-dotenv`

Go back to ./application  
`(venv) $ cd .. `

Set up front end (npm)  
`(venv) $ npm install`  
`(venv) $ npm run dev`

Terminal should output something like this

```
> project@0.0.0 dev
> vite

  VITE v4.4.9  ready in 502 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

Navigate to localhost, you will see the website. Right now time should be 0 (console will be reporting fetch error, ignore that).

To start the back end server, open up a second terminal and start venv  
`$ cd italian_3200_project/application/backend `  
`/backend $ source venv/bin/activate`  
`(venv) /backend $ cd ..`  
`(venv) $ npm run start-api`

Now website should be current time is 1692... some very long number.

To close venv  
`(venv) $ deactivate`

<strong>After first set up</strong>  
You can run 'npm run dev' outside of venv and preview the website, this will just mean no data can be fetched from our api.

Should only need these three commands after first set up:  
`/backend $ source venv/bin/activate`  
`(venv) $ npm run dev`  
`(venv) $ npm run start-api`
