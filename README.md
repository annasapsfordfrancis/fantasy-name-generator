# Fantasy Name Generator: A CS50 Final Project
#### Video Demo:  Coming soon!
#### Description:
A web app that generates fantasy names based on real-world cultures using Markov chains.

#### Usage:
- Choose a name list from the main dropdown.
- Choose a gender.
- Click the Generate Names button to generate a list of names.
- Click the Copy List button to copy the list to your clipboard.

#### Length:
For each name, two names are generated and only one is chosen. Length controls whether the shorter one (MIN), the longer one (MAX) or the one that's closer to the average length of the name list (AVG) is chosen.

#### Order:
Controls the Markov chain order. 2 creates more chaotic results. 4 creates more conservative results, but fewer names are generated.

#### Results:
The number of names generated.

### Installation

To build you'll need npm and [poetry](https://github.com/python-poetry/poetry).

Clone or download the repository.

Then go to the folder and run:

`npm install`

`poetry install`

To run the app:

`poetry shell`

`python app.py`

To recompile tailwindcss run:

`npx tailwindcss-cli@latest build ./static/src/main.css -c ./tailwind.config.js -o ./static/dist/main.css`

To purge tailwindcss run:

`NODE_ENV=production npx tailwindcss-cli@latest build ./static/src/main.css -c ./tailwino ./static/dist/main.css`


### Background

I run a weekly D&D game and I often struggle to find good sources of names for characters. There are plenty of tools and lists online but I often have to discard a large proportion of them. I wanted to come up with a simple web app that would generate a large number of names based on real-world cultures that I could easily copy into another program.

### Markov Chains
I was inspired to learn more about Markov chains when I came across Sam Twidale's [Markov Namegen project](https://www.samcodes.co.uk/project/markov-namegen/).

If you want to find out more about Markov chains check out [Daniel Schiffman's video](https://www.youtube.com/watch?v=eGFJ8vugIWA) for a super-accessible introduction!

The names that Markov chains generate can be very realistic, they can also be quite funny. I decided that the occasional silly name was all part of the experience!

I chose [namemaker](https://github.com/Rickmsd/namemaker), a Python project with excellent documentation that is focused on generating names (as opposed to sentences).

### Data Sets

After a lot of trial and error I learned that a good name list needs two things.

#### Size:
I found that 200 names is the bare minimum for good results and that 400 or even 1000 names gives a much better result.

#### Focus:
Mixing languages and cultures has unpredictable results. Although this might be what you're looking for!


### File Overview

#### Libraries:
I'm using Flask and Python to run things server-side and HTML and TailwindCss in the browser. Some of the browser-side scripting is pure JavaScript and some is HTMX. I'm using Flask-Assets to bundle script files.

#### static > data
This contains the name lists that namemaker uses to generate the Markov chains. Lists are separated by culture and gender.

- [Anglo-Saxon](https://s-gabriel.org/names/engoldenglish.shtml)
- [Arabic](https://en.wikipedia.org/wiki/List_of_Arabic_given_names)
- [German](https://s-gabriel.org/names/german.shtml)
- [Greek Myth](https://en.wikipedia.org/wiki/List_of_Greek_mythological_figures)
- [Norse](https://www.ellipsis.cx/~liana/names/norse/landnamabok.html)
- [Slavic](https://heraldry.sca.org/names/paul/)
- [Turkish](https://en.wikipedia.org/wiki/Category:Turkish_given_names)
- Victorian (from the 1841 census for England and Scotland)
- [Welsh](http://www.namenerds.com/welsh/lists.html)

#### templates

- layout.html -> contains the boilerplate html and the script and css links
- index.html -> contains the main app html including the search form and the placeholder for the generated names

#### app.py

Contains the server-side logic including the code for name generation and the html to be injected into index.html to display the generated names

#### Config Files

npm handles JavaScript dependencies in package.json

pypoetry handles Python dependencies in pyproject.toml

tailwind.config.js contains extra fonts, colours and plugins for tailwindcss

### In Detail

#### index.html
Contains the main app html including the search form and the placeholder for the generated names. HTMX sends the POST request to Flask and injects the html it receives into the results div beneath the form. It also applies a CSS transition.

TailwindCss handles the CSS and responsive layout.

#### app.py
Contains the server-side logic including the code for name generation and the html to be injected into index.html to display the generated names.

The server is Flask with Python for server-side scripting. Flask Assets bundles the CSS and JavaScript.

There are two app routes. One to render the main page and the other to handle name generation.

#### Name generation

The generate() method takes the following variables from the html form in index.html:

- name_type (anglosaxon/arabic/german/greekmyth/norse/slavic/turkish/victorian/welsh)
- gender (male/female/both)
- length (MIN/AVG/MAX)
- order (2/3/4)
- results (20/50/100)

The function uses name_type and gender to select the correct txt file:
- norse + female -> norse_f.txt
- norse + male -> norse_m.txt
- norse + both -> norse_f.txt AND norse_m.txt

#### Length:
For each name two names are generated and only one is chosen. Length controls whether the shorter one (MIN), the longer one (MAX) or the one that's closer to the average length of the name list (AVG) is chosen.

#### Order:
Controls the Markov chain order. 2 creates more chaotic results. 4 creates more conservative results, but fewer names are generated.

#### Results:
The number of names generated.

### Next Steps
I'd like to expand the number of name lists available to include French, Italian, Spanish and Ancient Roman names.

I'd also like to experiment with surnames, street names and town names.



