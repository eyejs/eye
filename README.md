# EYE.JS

Wanting to help with the way a website is programmed, I have written a small framework for code reuse and use of
previously created customizable HTML objects. It is really easy using eye objects.

You can see the example page in [eyejs.org](https://eyejs.org)


## Importing

Once you have eye folder of this repository in your project, you can use Eye.js 
Inside the head tag you should call the framework constructor

```HTML
<script src="eye/v0.01/eye.js"></script>
```

Or, just in testing, you can use the following script inside the head tag. 
In this case you do not need to have the eye folder in your project.

```HTML
<script src="https://eyejs.org/eye/v0.01/eye.js"></script>
```


### eye tags

To add an object to your project, open and close an eye tag inside the body tag.

The src and type attributes are required:
* *src:* is the local or internet path of the object
* *type:* is the id of the object


```HTML
<eye type="eye_front_0" src="https://eyejs.org/objects/v1.0/front_0/object.html"></eye>
```

The data attribute is optional and is used to customize the object. <br>
The format of the value of this attribute can change according to how the object is made.
Object creators must give instructions to customize the objects.

```HTML
<eye type="eye_front_0" src="https://eyejs.org/objects/v1.0/front_0/object.html" data='{
        "title": "EYE",
        "subtitle": "Keep it simple",
        "button": ["Store","https://eyejs.org/store/"],
        "buttonColor": "crimson",
        "note": "Raúl Méndez Rodríguez",
        "backgroundColor": "red",
        "urlImage": "image.png"
    }'></eye>
```

Only the value of the data attribute is shown here:

```JSON
{
    "title": "EYE",
    "subtitle": "Keep it simple",
    "button": ["Store","#"],
    "buttonColor": "crimson",
    "note": "Raúl Méndez Rodríguez",
    "backgroundColor": "red",
    "urlImage": "image.png"
    }
```


### One last step

At the end of the body tag, the process of changing the eye tags for the final elements must be started.
This is done by calling the eye.start () function.
Passing as a parameter the path of the folder where the constructor file is located, that is, the path where eye.js is located

```HTML
<script>
    //eye.start("path/to/");
    //eye.start("eye/");
    eye.start("https://eyejs.org/eye/v0.01/");
</script>
```


## Authors

* **Raúl Méndez Rodríguez** - [rgmendezr](https://github.com/rgmendezr)

Dare to join the project


## License

MIT

Copyright (c) 2021, Raúl Méndez Rodríguez

See the [LICENSE](LICENSE) file for details

## Get involved

* Tell others about this project
* Become backer [Patreon Eye.js](https://www.patreon.com/bePatron?u=45506021)
* or just say thank you if the project helps you

## One last thing

Thanks for getting here
