# EYE.JS

### How to use

##### Horizontal

For real projects, change the src attribute to the address of the locally stored object. View the objects that can be used in the objects folder of Eye repository.
<br>

```HTML
<eye type="horizontal-menu" src="https://eyejs.org/objects/v1.0/menu/horizontal.html" data='{
        "brand": "EYE.JS",
        "links": {
            "Home": "https://eyejs.org",
            "Github": "https://github.com/eyejs/eye",
            "Patreon": "https://www.patreon.com/bePatron?u=45506021",
            "Contact": "#contact"
        },
        "position": "fixed",
        "background": "#000"
    }'></eye>
```

You can change the value of <code> brand </code>. The <code> brand </code> key is fixed and is not changed. 
<br>
You can add links inside <code> links </code>. The <code> links </code> key must not be modified. 
<br>
Links are a json object. The keys are the text of the links that is shown in the menu. And the values of those keys are the links they will direct to. <br>
There is no limit of links.
<br>
The position key can take two values: <code> fixed </code> or <code> relative </code>

##### Vertical

```HTML
<eye type="nav" src="https://eyejs.org/eye/objects/menu/vertical.html"  data='{
        "brand": "EYE.JS",
        "links": {
            "Home": "https://eyejs.org",
            "Github": "https://github.com/eyejs/eye",
            "Contact": "#contact"
        },
        "img": "https://eyejs.org/things/eye-icon.png"
    }'></eye>
```
In this style the <code> position </code> key is removed and the <code> img </code> key is added
<br>
The value of <code> img </code> must be the address of the image to be displayed.
