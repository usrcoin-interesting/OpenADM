OmniUI Core 
---------------






## How to write a module ##
####configuration####
- write your configuration in **config.json** with json format, the key must same as you class name.
- Example:  assume your module call **hello**.py and your class names **Hello**. 

```
config.json
----------
....
"Hello":{
    "data1": "Hello,",
    "data2": ",Bye"
}
```
####Write your module code####
- Put your code in **modules directory**
- Your module should obey the following rules
- Define a global function **getInstance(core,parm)**.
    * core: the core object, you should register event or event handler via core object.
    * parm: the parameter you setting in **config.json**
- You can use  **core.registerEventHandler(eventName,eventHandler)** to register event.
    * eventName: the event you interesting.
    * eventHandler: the function which been invoked when event occurs.
- You can use  **core.registerEvent(eventName,generator,interval)** to generate event.
    * eventNmae: the event you provider.
    * generator: the function which trigger event. 
    * interval: the generator will run every interval seconds.
- You can use **core.registerURLApi(requestName, handler)** to register REST or weboscket service
    * requestName: http://<ip>:<port>/info/<requestName>
    * handler: the function which handles the REST or websocket request
    * REST and websocket service listens on localhost:5567 by default. You can change it by modifying `core/config.json` and `webui/js/omniui.js`
- You can use **core.registerAdapterHandler(sseName, handler)** to register Adapter Event
    * requestName: the Adapter event you interesting.
    * handler: the function which handles the specific event.

####Exapmle####
Assume you write a module **hello.py** and **echo.py**

- Hello.py will say something periodically.
- Echo.py will repeat what hello says.
- Echo.py will need to reponse to REST request `/info/echo` by what hello says.

**config.json**
```
"Hello":{
    "word": "Good!!"
}
"Echo":{
}
```


**hello.py**
``` python
class Hello:
    def __init__(self,core,parm):
        if(parm.has_key('word')):
            self.word = parm['word']
        else:
            self.word = "hello"
        core.registerEvent("saySomething", self.saySomething,4)
    def saySomething(self):
        return self.word
```


**echo.py**
``` python
class Echo:
    def __init__(self,core,parm):
        core.registerEventHandler("saySomething", self.repeat)
        core.registerURLApi("echo", self.handler)
    def repeat(self,event):
        self.event = event
        print self.event
    def handler(self):
        return self.event
```


