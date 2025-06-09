# Backrooms Map Generator
[![pages-build-deployment](https://github.com/jonathan-x01/BackroomsMapGenerator/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/jonathan-x01/BackroomsMapGenerator/actions/workflows/pages/pages-build-deployment)

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
