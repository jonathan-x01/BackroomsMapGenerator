# Backrooms Map Generator
[![pages-build-deployment](https://github.com/jonathan-x01/BackroomsMapGenerator/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/jonathan-x01/BackroomsMapGenerator/actions/workflows/pages/pages-build-deployment) [![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## Summary
This project is designed as a prototype for the [Project Backrooms](https://github.com/jonathan-x01/project-backroom-1.20.4) mod. With the new update, I restructured my project to allow others to easily create and implement their own algorithms into the map generator to allow more of a variety and help bring the adventure of the Backrooms into reality. I am still working on it to help make it easier to create and debug algorithms, but for now, I have made it easier to just implement the algorithm.

Deployment: https://jonathan-x01.github.io/BackroomsMapGenerator/

## Tutorial
It's very easy to implement your own algorithm, as it uses a registry.

### Implementing Algorithms
To implement/create your own algorithm, you will have to first create the file. 

1. Within `js/algorithms/algorithms`, create a new JS file with your algorithm name.
2. Create a class with the name of your algorithm. Now, make it extend the Algorithm class.
   ``` javascript
   class YourAlgorithm extends Algorithm {
      constructor(){
         super(width, height)
     }
   }
   ```
3. Next, for it to work properly, you will have to override the `generate()` function. This is where your logic will be.
   ``` javascript
   class YourAlgorithm extends Algorithm {
      constructor(){
         super(width, height)
     }

     generate(){
        // The logic of your algorithm.
     }
   }
   ```
4. Next, it won't work unless you import it into the `index.html` file. Placement matters, I have included a comment on where you place the `<script type="text/javascript" src="js/algorithms/algorithm/yourAlgorithm.js"></script>` at. That will be at the bottom of the `<body></body>` tags.
5. Now, you have to register your algorithm. So, within the `js/main.js` file, I put comments within the file of where you would add it. Within the same file, I ensure everything that you would need to do is near the top.
   To register your algorithm, you would use this code snippet.
   ``` javascript
   algorithms.register('your_algorithm', new AlgorithmData( 'Your Algorithm', new YourAlgorithm() ));
   ```
7. Once you register your algorithm, in the page, your algorithm should be listed under the Algorithms dropdown on the top control panel.

### Registering Blocks
Since this tool was originally designed for Minecraft, so will the blocks. If that makes sense. Anyways, if you want to use your own custom blocks, you can register them.
1. First, you of course have to create your block. Once you have finished creating your block, it is important to place the file in `imgs/blocks`. You must also have the file in PNG. Currently, I have it hard-coded to only accept PNGs (No idea why I did that. lol), I plan to change that to accept all file types; the only restriction would be the browser.
2. Next, you must register the block. So, head to the `js/main.js` file and just follow the comments. To register your block, use this snipper.
``` javascript
blocks.register('my_block', new BlockData('myBlock'));
```
The `my_block` is the identifier, while the `myBlock` within the `BlockData()` is the file name.

3. You don't really need to call it directly from the registry; all you need is the identifier. But just in case, here is the code to call it.
``` javascript
blocks.get('my_block').getSrc();
```

### Creating your algorithm
When creating your own algorithm, you will use a lot of brain power, you probably will get brain fatigue; however, if you have the passion and motivation, you can accomplish anything. To help, I try to make it as easy as possible. I originally created this project to help me with my algorithm for my Minecraft mod since it can help me visualize it better, and so I don't have to constantly run Minecraft to ensure it works.

With your newly created algorithm class, you will be called `this.map` a lot. `this.map` is a 2D array that is used as your canvas. Which I think is pretty straightforward. Now, when placing a block at the designated location, you will need to insert data into the chosen cell. Currently, this is still a work in progress and I plan to make it a lot easier in the future but when placing the data in the cell, it need to be in this format:
``` javascript
{
   type: "wall",
   texture: "my_block",
   debug: {
      type: "wall"
   }
}
```

Key:
type:string = The type of cell it is. This can be anything you want it to be.
texture:string = The identifier of the texture to use for the selected cell. This has to be a block you have registered previously in the `js/main.js` file. 
debug-type:string = This is the subtype of the current cell.

Again, all the cell data is still a work in progress and may be changed later on.

## Backlog
I do have a backlog of what I plan to change and improve to help make this tool as useful as possible.

1. Style overhaul - I plan to change the style of the page to make it look unique.
2. Cell data improvement - To make it easier to set cell data, which will hopefully make my project more stable.
3. Debugging Tools - Currently, I have it hardcoded where only my Point Distribution algorithm has the tools necessary, where I could easily debug it, but I plan to improve it where anyone can use debugging features.
