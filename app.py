from flask import Flask, render_template, render_template_string, request
from flask_assets import Bundle, Environment
import namemaker

app = Flask(__name__)

assets = Environment(app)
css = Bundle("src/main.css", output="dist/main.css", filters="postcss", depends=('templates/*.html'))
js = Bundle("src/*.js", output="dist/main.js")

assets.register("css", css)
assets.register("js", js)
css.build()
js.build()


@app.route("/")
def index():
    return render_template("index.html")

# generate a name based on name_type (anglosaxon/arabic/german/norse/slavic/turkish/welsh) and gender (female/male/both)
@app.route("/generate", methods=["POST"])
def generate():
    # get the name_type and gender from the form in index.html
    name_type = request.form.get("name_type")
    gender = request.form.get("gender")
    length_lookup = {"MIN": namemaker.MIN, "AVG": namemaker.AVG, "MAX": namemaker.MAX}
    length = length_lookup[request.form.get("length")]
    order = int(request.form.get('order'))
    number_results = int(request.form.get('number_results'))
    # look up the file path of the name list {lookup[name_type][0]} = female, {lookup[name_type][1]} is male
    # then call namemaker.make_name_set to create a name_set object
    lookup = {'anglosaxon': ['anglosaxon_f.txt', 'anglosaxon_m.txt'], 'arabic': ['arabic_f.txt', 'arabic_m.txt'],'german': ['german_f.txt', 'german_m.txt'],'greekmyth': ['greekmyth_f.txt', 'greekmyth_m.txt'],'norse': ['norse_f.txt', 'norse_m.txt'],'slavic': ['slavic_f.txt', 'slavic_m.txt'],'turkish': ['turkish_f.txt', 'turkish_m.txt'],'victorian': ['victorian_f.txt', 'victorian_m.txt'],'welsh': ['welsh_f.txt', 'welsh_m.txt']}
    if gender == 'female':
        name_set = namemaker.make_name_set(f'./static/data/{lookup[name_type][0]}', clean_up = False, order=order)
    elif gender == 'male':
        name_set = namemaker.make_name_set(f'./static/data/{lookup[name_type][1]}', clean_up = False, order=order)
    else:
        # combine female and male files -> this can lead to some interesting results!
        name_set = namemaker.make_name_set(f'./static/data/{lookup[name_type][0]}', clean_up = False, order=order)
        name_set += namemaker.make_name_set(f'./static/data/{lookup[name_type][1]}', clean_up = False, order=order)

    results = []
    
    # call name_maker to make names based on the name_set and append them to results
    for i in range(number_results):
        results.append(name_set.make_name(exclude_real_names=True, pref_candidate=length))

    # create template table rows
    # Copy List button is also included at top
    list_template = """
        <div id="results" class="transition flex flex-col pt-6 md:pt-8" >
        <button onclick="copy()" class="p-4 px-32 mb-6 font-medium rounded-md font-ui text-2xl bg-gray-500 focus:outline-none focus:ring focus:ring-3 focus:ring-gray-400 text-white tracking-wide max-w-sm m-auto hover:bg-gray-400">Copy List</button>
        <ul aria-label="results" class="m-auto text-center font-medium tracking-wide column-count-1 sm:column-count-3 lg:column-count-5">
        {% for result in results %}
            <li class="">{{ result }}</li>
        {% endfor %}
        </ul>
        </div>
    """
    # render table rows with names to index.html
    return render_template_string(list_template, results=results)


if __name__ == "__main__":
    app.run(debug=False)