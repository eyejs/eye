# EYE.JS v0.02

Wanting to help with the way a website is programmed, I have written a small framework for code reuse and use of
previously created customizable HTML objects. It is really easy using eye objects.


## Importing

Once you have eye folder of this repository in your project, you can use Eye.js 
Inside the head tag you should call the framework constructor

```HTML
<script src="eye/v0.02/eye.js"></script>
```

Or, just in testing, you can use the following script inside the head tag. 
In this case you do not need to have the eye folder in your project.

```HTML
<script src="https://almendro.cr/eye/v0.02/eye.js"></script>
```

## eye object

Static object example:

```HTML
<eye src="path/to/object.html"></eye>
```

Custom object example:

```HTML
<eye src="path/to/object.html" data='Hello!'></eye>
```

or maybe:

```HTML
<eye id="example_id" src="path/to/object.html" data='{"name":"example", "type": "json"}'></eye>
```

Soon more details and examples

## Importing

At the end of the body tag, the process of changing the eye tags for the final elements must be started.
This is done by calling the eye.start () function.
Passing as a parameter the path of the folder where the constructor file is located, that is, the path where eye.js is located

```HTML
<script>
    //eye.start("path/to/");
    //eye.start("eye/");
    eye.start("https://almendro.cr/eye/v0.02/");
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
