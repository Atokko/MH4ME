/*
JAVA HUNTER
A text based action game based on the Nintendo video game series Monster Hunter 4 Ultimate written in javascript.
The purpose of this personal on-going project is to try and recreate every aspect of the game into javascript code.
The main purpose of this project is for personal entertainment and practice in coding.
A pragmatic purpose for this project is the calculation of equipment stats and skills. Monster hunter is a game requiring a good amount of calculation from combining different armour pieces that each carry different attributes.
data collected from http://kiranico.com/en/mh4u/monster/silver-rathalos http://kiranico.com/en/mh4u/armor
damage calculations from http://gaijinhunter.tumblr.com/post/73946102476/mh4-how-damage-calculation-works-simplified

-----
Andrew Tokko
*/

function monsterHunter(gender) {
//creating a monster hunter prototype and giving basic game character values hp and gender. Gender is created upon creation of character.
    this.gender = gender;
    this.hp = 100;
    var skillSet = {
        tenderizer : [0, undefined, undefined, undefined,"Weakness Exploit", undefined, undefined, undefined, undefined],
        sharpness : [0, undefined, undefined,"Blunt Edge", "Razor Sharp", undefined, undefined, undefined, undefined],
        fireAtk : [0, undefined, undefined,"Fire Attack Down", "Fire Attack +1", "Fire Attack +2","Fire Attack +3", undefined, undefined],
        recLevel : [0, undefined, undefined,"Recovery Down", "Recovery Up", undefined, undefined, undefined, undefined]
    };
    // this is a data set containing all possible skills available if unlocked by armour skills. Skills are arranged as different arrays containing possible skills. the first element of each array is a number which indicates how many skill points are currently unlocked. it is initially 0, but it can range from -20 to 25. The lower the number the weaker the skill.
    function actives(skillSet){
        var arr = [];
        for(var x in skillSet){
            for(var i = 0;i < skillSet[x].length;i++){
                if(typeof(skillSet[x][i]) == "string"){
                   var rep = skillSet[x][i].split(" ")[0].toLowerCase();
                   var sub = skillSet[x][i].split(" ")[0];
                   var ans = skillSet[x][i].replace(sub, rep);
                   arr.push(ans.split(" ").join(""));
                   };
            }
            //this takes the skill name e.g:"Fire Attack" and transforms it: ""fireAtk" so it can be called by an object
        }
        return arr;
    }
    var activeSkillSet = actives(skillSet);
    // this creates a data set containing all the currently active skills unlocked by currently equipped armour.
    this.equipment = {head:{defense : 0},chest:{defense : 0},arms:{defense : 0},waist:{defense : 0},legs:{defense : 0},weapon : {defense : 0}};
    //this is a collection of different hunter body parts where armour can be equipped and the initial defense value of 0
    this.equip = function(armor){
       for(var x in this.equipment){
          if(armor.part == x)
            this.equipment[x] = armor;
       }
    }
    //this is a function for the hunter to equip different armour pieces on their respective body part: hunter.equip(armor);
    this.wield = function(weapon) {
        for(var x in this.equipment){
          if(weapon.part == x)
            this.equipment[x] = weapon;
       }
    }
    //this is a function for the hunter to equip a weapon. hunter.wield(weapon);
    this.unequip = function(part) {
        this.equipment[part] = {defense : 0};
    }
    //basic character value defense calculates the amount of defense points given by the currently equipped armour
    this.defense =function defenseCalc() {
        var sub = 0;
        for(var x in this.equipment){
            sub += this.equipment[x].defense;
        }
        return sub;
    }
    //basic character value attack calculates the amount of attack points given by the currently equipped weapon
    this.attack = function attackCalc() {
        var sub = 0;
        for(var x in this.equipment){
            if(x == "weapon")
            sub += this.equipment[x].attack;
        }
        return sub;
    }
    //basic character value elemental value, if and only if the currently equipped weapon has an elemental or abnormal status attribute
    this.elemental = function(){
        var obj = {};
        obj[this.equipment.weapon.elemental] = this.equipment.weapon.elementalDmg;
        return obj;
    }
    //basic character value chart of different elemental resistance points
    this.stats = function(){
        var obj = {fire : 0, water : 0, ice : 0, thunder : 0, dragon : 0};
        //data set of key/value pairs of different elements and the initial reisistance points. can range from ...-N to N...
        for(var x in this.equipment) {
           if(Array.isArray(this.equipment[x].resistance)) {
              obj.fire += this.equipment[x].resistance[0];
              obj.water += this.equipment[x].resistance[1];
              obj.ice += this.equipment[x].resistance[2];
              obj.thunder += this.equipment[x].resistance[3];
              obj.dragon += this.equipment[x].resistance[4];
              obj.defense = this.defense();
              obj.attack = this.attack();
              obj.elemental = this.elemental();
           }
        }
        return obj;
        //this checks different equipment pieces for elemental attributes and matches and adds them to the initial values.
    }
    this.skills = function(){
       for(var i in this.equipment){
        for(var x in this.equipment[i].skills)
            skillSet[this.equipment[i].skills[x][0]][0] += this.equipment[i].skills[x][1];
       }
       return activeSkills(skillSet);   
    }
    //this is a character method that shows all the currently active skills unlocked by currently equipped armour
    function activeSkills(obj){
       var arr = [];
       for(var x in skillSet){
          if(obj[x][0] <= -20)
            arr.push(skillSet[x][1]);
          else if(obj[x][0] <= -15)
           arr.push(skillSet[x][2]);
          else if(obj[x][0] <= -10)
           arr.push(skillSet[x][3]);
          else if(obj[x][0] >= 10)
            arr.push(skillSet[x][4]);
          else if(obj[x][0] >= 15)
            arr.push(skillSet[x][5]);
          else if(obj[x][0] >= 20)
            arr.push(skillSet[x][6]);
       };
       return arr;
    };
    //this function creates a chart of unlocked skills based on how many points are currently unlocked
    this.quit = function(){ alert("bye"); throw new Error("YOU EXITED THE GAME THANKS FOR PLAYING!");};
    //this function returns an error to quit the entire game

    this.fight = function(monster){
        //this is special function made to represent a fight between a hunter and a monster.
        var monsterDefense = .75;
        //this variable is defined to represent the monsters defense. It is a percentage used in the damage calculation.
        this.equipment.weapon.attackList.DODGE = 0;
        //this is defining the action DODGE which can only be used during a fight
        this.flinch = function(){
            console.log("You flinched!");
            alert("YOU FLINCHED!");
            return monster.fight(this)};
        //this is defining the action flinch which can only be activated during a fight
        var obj = this.equipment.weapon.attackList;
        var obj2 = this.equipment.weapon;
        console.log(obj);
        this.equipment.weapon.attackList.HEAL = 0;
        //this is defining the action HEAL which can only be used during a fight
        var attack = fighter(this);
        function fighter(hunter){
            var arr = [];
            for(var x in me.equipment.weapon.attackList)
                arr.push(x);
            var str = " ";
            alert("HP: " + hunter.hp + "\n" +
                monster.type + " : " + monster.hp,"DOWNWARD_SLASH");
            for(var i = 0;i < arr.length;i++){
                str += (i + ": " +  arr[i] + "\n");
            }
            var i = prompt("choose a number to attack" + "\n" + str + "\n");
            if(isNaN(i) || i == undefined){
                return arr[3];
            }  
            return arr[i];
        }
        //this is a special function that asks the player which attack should be used.
        if(attack == "DODGE"){
            var i = Math.round(Math.random() * 5);
                if(i < 3){
                    console.log("You dodged!");
                    alert("you dodged!");
                    console.log("HP: " + this.hp);
                    console.log(monster.type + " : " + monster.hp);
                    monsterDefense = 0;
                    return this.fight(monster);
                }
                else{
                    console.log("You're too slow!");
                    alert("YOU'RE TOO SLOW!")
                    return monster.fight(this);
                }
                                    
            }
            //creating the DODGE action. DODGE causes no damage and has a chance to fail in which the monster may attack you
        if(attack == "HEAL"){
            var i = Math.round(Math.random() * 5);
                if(i < 4){
                    console.log("You healed!");
                    alert("you healed!");
                    this.hp += 25;
                    if(this.hp >= 150){
                        this.hp  = 150;
                    }
                    console.log("HP: " + this.hp + " + " + 25);
                    console.log(monster.type + " : " + monster.hp);
                    monsterDefense = 0;
                    return this.fight(monster);
                }
                else{
                    console.log("You're too slow!");
                    alert("YOU'RE TOO SLOW!")
                    return monster.fight(this);
                }
        }
        //creating the HEAL action. HEAL adds more health to the hunter and causes no damage, and also has a chance to fail.
        function abnormal(){
            for(var x in monster.abnormalStatus){
                if(obj2.elemental == monster.abnormalStatus[x])
                    return obj2.elementalDmg;
            }
            return false;
        }
        var abnormal = abnormal();//calculates elemental damage
        var part = Math.floor(Math.random()*monster.bodyParts.length);
        var damage = ((((this.equipment.weapon.attack * (1 + 0.25*(this.equipment.weapon.criticalRate/100)))/this.equipment.weapon.modifier) * (this.equipment.weapon.attackList[attack]/100)) * (monster.damageChart[monster.bodyParts[part]][this.equipment.weapon.damageType]) + ((this.equipment.weapon.elementalDmg/10) * ((abnormal || monster.bodyParts[part].elemental))));//calculates physical damage * elemntal
    this.damage = damage * monsterDefense;
        //this is the damage calculation: Damage = [Physical damage] + [Elemental Damage] * Overall Defense
        if(attack == "SPIRIT_SLASH"){
            var counter = 0;
            var baseDmg = this.damage;
            var i = Math.floor(Math.random() * 5)
            if(i < 4){
                counter++;
                if(counter > 0){
                    this.damage += (baseDmg * .05);
                }
                monster.hp -= damage;
                console.log("You hit the " + monster.type + "'s " + monster.bodyParts[part] + " " + part);
                console.log("HP: " + this.hp);
                console.log(monster.type + " : " + monster.hp);
                console.log("Your weapons shimmers with sharpness...");
                alert("HP: " + this.hp + "\n" +
                    monster.type + " : " + monster.hp + "\n" + 
                    "You hit the " + monster.type + "'s " + monster.bodyParts[part] + " " + part + "\n" +
                    "Your weapons shimmers with sharpness..." + "\n" +
                    "damage : " + this.damage
                );
                return this.fight(monster);
            }
            else{
                console.log("too slow!");
                console.log("Your weapon loses its glow...")
                alert("YOU'RE TOO SLOW!"+ "\n" +
                     "You're weapon loses its glow...");
                counter = 0;
                this.damage = baseDmg;
                return monster.fight(this);
            }
        }
        /*this attack is represented as a function. SPIRIT SLASH causes damage and increases overall damage with every succesful hit.
        It also has a chance to fail in which the monster may attack you and all increased damage is lost.
        */
        else{
            monster.hp -= damage;
            console.log("You hit the " + monster.type + "'s " + monster.bodyParts[part] + " " + part);
            console.log("HP: " + this.hp);
            console.log(monster.type + " : " + monster.hp);
            alert("HP: " + this.hp + "\n" +
                monster.type + " : " + monster.hp + "\n" + 
                "You hit the " + monster.type + "'s " + monster.bodyParts[part] + " " + part + "\n" +
                "damage : " + this.damage
                 );
            if(monster.hp <= 0){
                alert("QUEST COMPLETE")
                return town(this);
            }
            else{
            return monster.fight(this)
            }
        }
        return 0;
    }
};

function skillsBuild(args) {
       var skills = {};
       for(var i = args.length -1; i >= 0;i--){
          if(Array.isArray(args[i]))
             skills[args[i][0]] = args[i];
          }
       return skills;
}
//this is a function created to build a set of data containing key/value pairs of different skills and how many points they unlock
function slotsBuilder(slots) {
     var arr = {};
     for(var i = 1; i <= slots; i++) {
       arr[i] = "slots " +i;
      }
     return arr;
}
//this is a function created to build a set of data containing key/value pairs of different skills and how many points they unlock
function armor(name, type, part, gender, rarity, slots, defense, fire, water, ice, thunder, dragon, skills) {
    //this is a prototype for creating different armour pieces with basic armor attributes name,part,gender,rarity, defense, slots,skills,and reistance points
    this.name = name;
    this.part = part;
    this.gender = gender;
    this.rarity = rarity;
    this.defense = defense;

    this.slots = slotsBuilder(slots);

    this.skills = skillsBuild(arguments);

    this.resistance = [fire, water, ice, thunder, dragon];
};

function weapon( damageType, name, weaponType, rarity, attack, trueAttack, defense, affinity, slots, elemental, elementalDmg, affinity){
    //this is a prototype to create a weapon with basic weapon attributes damage type, body part, weapon name, type of weapon, the availale attacks, true attack value, defense, affinty points, elemental status and damage.
    var weaponTypes = {"Long Sword": {
                            DOWNWARD_SLASH : 26,
                            VERTICAL_SLASH: 23,
                            SPIRIT_SLASH: 28,
                      }};
    this.damageType = damageType;
    this.part = "weapon";
    this.name = name;
    this.weaponType = weaponType;
    this.attackList = weaponTypes[weaponType];
    this.rarity = rarity;
    this.attack = attack;
    this.trueAttack = trueAttack;
    this.defense = defense;
    this.affinty = affinity;
    this.slots = slotsBuilder(slots);
    this.elemental = elemental;
    this.elementalDmg = elementalDmg;
    function modifierBuilder(type){
        for(var x in weaponTypes){
            if(x == "Long Sword")
                return 3.3;
        }
    }
    this.modifier = modifierBuilder(weaponType);
    this.criticalRate = affinity;
}

function monster(type, baseHP, arr) {
    //this is a special protoype to create a monster and gives it basic attriburtes type hp and arrays of different body parts
    var monst = this;
    this.type = type;
    this.status = "normal";
    this.baseHP = baseHP;
    this.hp = Math.floor(baseHP + (Math.random() * baseHP));
    var rageCount = 0;
    this.enraged = function(){
        rageCount++;
         console.log(this.type + " is ENRAGED!");
         alert(this.type + " is ENRAGED!" + "\n" +
             this.type + " starts to burning with power..."
              );
         for(var x in monst.attackList){
             if(typeof(monst.attackList[x]) == "number"){
                monst.attackList[x] *= 2;
             }
         }
        if(rageCount > 3){
            rageCount = 0;
            this.status = "normal";
            alert(this.type +" goes back to looking normal")
            for(var x in monst.attackList){
                if(typeof(monst.attackList[x]) == "number"){
                    monst.attackList[x] /= (3 * 2);
                }
            }
            
        }
    };
    //this is a function representing the monster in an enraged mode, in which the monster gains an attack boost
    var bodyParts = ["Head", "Neck", "Back","Belly","Tail","Wings","Tail_Tip"];
    this.bodyParts = bodyParts;
    var abnormalStatus = ["poison", "sleep"];
    //data set of possible abnoraml statuses which can be unlocked
    this.abnormalStatus = abnormalStatus;
    var damageChart = damageChartBuilder(arguments);
    function damageChartBuilder(arr) {
        var chart = {};
        for(var i = 0; i < arr.length; i++){
            if(Array.isArray(arr[i])){
                for(var j = 0;j < bodyParts.length;j++){
                    if(arr[i][0] === bodyParts[j]){
                        var obj =  {region: arr[i][0], cut: 0, impact: 0, fire: 0, water: 0, ice: 0, thunder: 0, dragon: 0};
                        obj.cut += arr[i][1];
                        obj.impact += arr[i][2];
                        obj.fire += arr[i][3];
                        obj.water += arr[i][4];
                        obj.ice += arr[i][5];
                        obj.thunder += arr[i][6];
                        obj.dragon += arr[i][7];
                        chart[arr[i][0]] = obj;
                    }
                    if(arr[i][0] === abnormalStatus[j]){
                        var obj =  {"Abnormal Status": arr[i][0], initial: 0, increase: 0, max: 0, duration: 0, damage: 0};
                        obj.initial += arr[i][1];
                        obj.increase += arr[i][2];
                        obj.max += arr[i][3];
                        obj.duration += arr[i][4];
                        obj.damage += arr[i][5];
                        chart[arr[i][0]] = obj;
                    }

                }
            }
        }
        return chart;
    }
    //this creates a chart in which it shows the different key/value pairs of different body parts and their different resistance points and weaknesses
    this.damageChart = damageChart;
    function monsterAttackListBuilder(arr) {
        for(var i = 0; i < arr.length; i++){
            if((!(Array.isArray(arr[i]))) && !(typeof(arr[i]) == "string") && !(typeof(arr[i]) == "number")){
                return arr[i];
            }
        }
    }
    //creates a list of different monster attacks
    this.attackList = monsterAttackListBuilder(arguments);
    this.fight= function (hunter){
        //this is a special function representing a fight between a monster and a hunter
        if(this.hp <= this.baseHP){
            this.status = "Enraged";    
            this.enraged();
        }
        this.attackList.ROAR = function(hunter){
            console.log("RRRRROOOOOOAAAAAAAARRRRRRRR!!!!!");
            alert("RRRRROOOOOOAAAAAAAARRRRRRRR!!!!!");
            return hunter.flinch();
        }
        //creates a new attack ROAR which can only be usd in a a fight, and if activated the hunter flinches and the monster has a chance to attack
        function pickRandomProperty(obj) {
            var result;
            var count = 0;
            for (var prop in obj)
                if(Math.random() < 1/++count)
                    result = prop;
            return result;
        };
        //a pure function that takes an object and chooses a random property
        var attack = pickRandomProperty(this.attackList);
        //monster chooses random attack
        if(attack == "ROAR")
            return this.attackList[attack](hunter);
        else{
            hunter.hp -= this.attackList[attack];
            console.log("HP: " + hunter.hp);
            console.log(this.type + " : " + this.hp);
            console.log(Silver_Rathalos.type + " has used " + attack);
            alert("HP: " + hunter.hp + "\n" +
                   this.type + " : " + this.hp + "\n" + 
                  this.type + " has used " + attack
                 );
            if(hunter.hp <= 0){
                alert("QUEST FAILED")
                return hunter.quit();
            }
            //if the hunters hp has reached below 0 then the quest has failed and the game quits
            else{
            return hunter.fight(this);
            }
            //if not then it is the hunter's turn to attack
        }
    }
    return 0;
}


var me = new monsterHunter("male");
//a male hunter named me is created
var silver_Solhelm = new armor("Silver Solhelm", "blademaster", "head", "both", 7, 1, 81, 2, -7, 0, -4, 4, ["tenderizer",2], ["sharpness",3], ["fireAtk",4], ["recLevel",-3]);
var silver_Solmail = new armor("Silver Solmail", "blademaster", "chest", "both", 7, 3, 81, 2, -7, 0, -4, 4, ["tenderizer",1], ["sharpness",2], ["recLevel",-2]);
var silver_Solbraces = new armor("Silver Solbraces", "blademaster", "arms", "both", 7, 2, 81, 2, -7, 0, -4, 4, ["tenderizer",2], ["sharpness",1], ["fireAtk",4], ["recLevel",-3]);
var silver_Solcoil = new armor("Silver Solcoil", "blademaster", "waist", "both", 7, 2, 81, 2, -7, 0, -4, 4, ["tenderizer",2], ["sharpness",1], ["fireAtk",5], ["recLevel",-3]);
var silver_Solgreaves = new armor("Silver Solgreaves", "blademaster", "legs", "both", 7, null, 81, 2, -7, 0, -4, 4, ["tenderizer",3], ["sharpness",3], ["fireAtk",4], ["recLevel",-2]);
var hidden_Saber = new weapon("cut","Hidden Saber", "Long Sword", 6, 462, 140, 0, 25, 2, "poison", 100, .30);
//the silver Sol armor set is created
me.equip(silver_Solhelm);
me.equip(silver_Solmail);
me.equip(silver_Solbraces);
me.equip(silver_Solcoil);
me.equip(silver_Solgreaves);
me.wield(hidden_Saber);
//silver sol set is equipped
function transform(string){
    string = string.replace(/([\s\t\r\n]+)/gi," ").split(" ");
    string[3] = " ";
    string = string.filter(function(element) {
                 if(/([\s\t\r\n]+)/gi.test(element))
                   return false;
                 else
                   return true;
    });
    string = string.map(function(element){
        if(/([\d]+)/.test(element)){
            element = parseInt(element);
        }
        return element;
    });;
    return string;
}
//this is a pure function created to create easier data collection from the kiranico website. takes a string E.g:"Back	55	50	30	5	20	5	15	0" and returns a new array E.g:["Head", 18, 18, 0, 35, 20, 30, 0]
var back = transform("Back	55	50	30	5	20	5	15	0");

var belly = transform("Belly	25	30	30	5	15	10	10	0");

var tail = transform("Tail	20	20	15	0	10	5	5	0");

var wings = transform("Wings	44	44	25	0	25	10	15	0");

var legs = transform("Legs	35	35	45	0	10	5	10	0");

var tailTip = transform("Tail_Tip	35	35	24	0	10	5	10	0"); 

var Silver_Rathalos = new monster("Silver Rathalos", 4900, ["Head", 18, 18, 0, 35, 20, 30, 0], ["Neck", 15, 15, 0, 35, 20, 30, 0], back, belly, tail, legs, tailTip, wings, ["Poison", 180, 100, 580, 60, 150], ["Sleep", 180, 100, 580, 40, 0], {FIREBALL: 36, TAILWHIP: 20, CHARGE: 25});
//create a new type of monster silver rathalos
function landScape(location, building){
    this.build = building;
    this.location = location;
}
//creating a new landscape value. used to create towns
function sell(hunter, stock){
    var stock = stock;
    alert("Welcome to the general store! "+ hunter +" Look at this stuff.");
}
// a sell function for any stores
var generalGoods = {potion:{value:60}, antidote:{value:50}}
//general items found in monster hunter and their price
function welcome(hunter){
    console.log("back to town");
    alert("Welcome to Java Hunter");
    choicer(hunter);
    }
//a function welcoming new players to JAVA HUNTER
function quest(hunter){
    alert("YOU HAVE STARTED A QUEST!");
    hunter.fight(Silver_Rathalos);
}
//a function to represent a a start to a new quest
function town(hunter){
    //this is a function that returns an object of different landscape values, which represent a town
    var obj = {};
    obj["N"] = new landScape("N", function store(hunter){
        this.description = "This is North of the town center. nice...";
        choicer(hunter);
    });
    obj["E"] = new landScape("E", function arena(hunter){
        quest(hunter);
    });
    //this landscape contains an arena function which sends the hunter on a quest
    obj["C"] = new landScape("C", function townCenter(hunter){
        this.description = "-You are standing in the town center of a monster hunter village" + "\n" +
            "-to the North is a general store under construction" + "\n" +
            "-Try your luck fighting a Dragon to the East";
        hunter.look();
    });
    //this landscape value contains a a town center which tells you information about the town
    obj["S"] = new landScape("S", function townCenter(hunter){
        this.description = "This is South of the town center. nice...";
        choicer(hunter);
    });
    obj["W"] = new landScape("W", function townCenter(hunter){
        this.description = "This is West of the town center. nice...";
        choicer(hunter);
    });
    //creating N,E,S,W landscapes
    hunter.move = function(direction){
        if(!(typeof(direction) == "string")){
            direction = mover(hunter);
        };
        for(var x in obj){
            if(direction == x){
                obj[direction].currentCharacter = hunter;
                hunter.currentLocation = obj[x];
            }
            else if(hunter.currentLocation != obj[x]){
                obj[x].currentCharacter = undefined;
            }
        }
        for(var i in obj){
            if(obj[i].currentCharacter != undefined){
                if(obj[i].build != undefined){
                    obj[i].build(hunter);
                }
            }
        }
        return direction;
    }
    //this is a method given to the character to move around the town
    hunter.look = function(){
        alert(hunter.currentLocation.description);
        return choicer(hunter);
    }
    //this is a method given to the character to look around the current landscape
    hunter.move("C");
    
    return obj;
}

var world = town(me);
//creating a new town with me inside
function choicer(hunter){
    
    var choices = {move:"move",look:"look", quit:"quit"};
    var arr = [];
    for(var x in choices){
        arr.push(choices[x]);
    }
    var choice = prompt("what would you like to do?" + "\n" +
                        arr)
    if(choice in choices){
        hunter[choice]();
    }
    else{
        alert("nope");
        choicer(hunter);
    }
};
//this is a special function given used to give the user a choice of the hunter's actions available to them
function mover(hunter){
    var choices = {N:"N",E:"E", S:"S",W:"W",C:"C"};
    var arr = [];
    for(var x in choices){
        arr.push(choices[x]);
    }
    var choice = prompt("where would you like to go?" + "\n" +
                        arr);
    if(choice in choices){
        hunter.move(choice);
    }
    else{
        alert("nope");
        mover(hunter);
    }
    return choice;
}
//this is a special function used to give the user a choice to move the hunter to different locations
/*thanks for taking a look!*/