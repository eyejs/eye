# EYE.JS

Wanting to help with the way a website is programmed, I have written a small framework for code reuse and use of
previously created customizable HTML objects. It is really easy using eye objects.

You can see the example page in [eyejs.org](https://eyejs.org)


## Start

Once you have eye folder of this repository in your project, you can use Eye.js


### Importing

Inside the head tag you should call the framework constructor

```HTML
<script src="path/to/eye.js"></script>
```


### eye tags

To add an object to your project, open and close an eye tag inside the body tag.

The src and type attributes are required:
* *src:* is the local or internet path of the object
* *type:* is the id of the object


```HTML
<eye type="example" src="https://eyejs.org/objects/example.html"></eye>
```

The data attribute is optional and is used to customize the object. <br>
The format of the value of this attribute can change according to how the object is made.
Object creators must give instructions to customize the objects.
The following example shows that the data attribute of the eye tag can be filled with a json.

```HTML
<eye type="example" src="https://eyejs.org/objects/example.html" data='{
        "title": "The beauty of simplicity!",
        "slogan": "a whole world to create with just customizable HTML objects",
        "github": "https://github.com/eyejs/eye",
        "patreon": "https://www.patreon.com/bePatron?u=45506021",
        "video": "https://eyejs.org/things/eye-video.mp4"
    }'></eye>
```

Only the value of the data attribute is shown here:

```JSON
{
"title": "The beauty of simplicity!",
"slogan": "a whole world to create with just customizable HTML objects",
"github": "https://github.com/eyejs/eye",
"patreon": "https://www.patreon.com/bePatron?u=45506021",
"video": "https://eyejs.org/things/eye-video.mp4"
}
```


### One last step

At the end of the body tag, the process of changing the eye tags for the final elements must be started.
This is done by calling the eye.start () function.
Passing as a parameter the path of the folder where the constructor file is located, that is, the path where eye.js is located

```HTML
<script>
    //eye.start("path/to/");
    eye.start("eye/");
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