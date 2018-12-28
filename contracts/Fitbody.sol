pragma solidity ^0.5.0;

import "./Ownable.sol";


contract Fitbody is Ownable {

    //成员属性
    struct member {
        uint backMuscle;   //背部肌肉 6
        uint chestMuscle;  //胸部肌肉 5
        // uint shoulderMuscle ; //肩部肌肉 4
        uint armMuscle; //手臂肌肉 3
        // uint bellyMuscle; //腹部 2
        uint legMuscle; //腿 7
        uint vitality;//体力值  10
        string name;
        uint256 amount;
        uint256 LaststartRestTime;
        uint increaseRatio;
        uint state;
       
    }
    

    //所有者地址
    mapping (uint256 => address) public bodyToOwner;
    //当前账户下健身人的个数
    mapping (address => uint256) internal ownerBodyCount;
    
    //当前账户下的健身人数组
    member[] public  members;
    
    
    
    //创建健身人的私有构造函数
    function _createMember(uint _backMuscle, uint _chestMuscle,uint _armMuscle, uint _legMuscle, uint _vitality, string memory _name, uint256 _amount) private {
        //require(msg.value >= 0.001 ether);
        
        uint256 id = members.push(member( _backMuscle,  _chestMuscle,_armMuscle, _legMuscle,  _vitality, _name, _amount, now, 1, 0)) - 1;
        bodyToOwner[id] = msg.sender;
        ownerBodyCount[msg.sender] = ownerBodyCount[msg.sender] + 1;
        
    }
    
    //创建健身人
    function creatMember(string  calldata _name) payable external {
        
        _createMember(1,1,1,1,10, _name, msg.value);
    }
    

    function getBodyCount() external view returns(uint256) {
        return members.length;
    }
    
    //训练训练不同部位，使不同部位的肌肉量增加
    function TrainBody (uint256 id, uint choice) external  {
        
        require(msg.sender == bodyToOwner[id]);

        require(members[id].state == 0);
        
        require(choice == 1 || choice == 2 || choice == 3 || choice == 4);
        
        member storage myMember = members[id];
        
        
        if (choice == 1) {
            require(myMember.vitality >= 6);
            myMember.backMuscle += 1 * myMember.increaseRatio;
            myMember.vitality -= 6;
            
            
        } else  if (choice == 2) {
            require(myMember.vitality >= 5);
            myMember.chestMuscle += 1 * myMember.increaseRatio;
            myMember.vitality -= 5;
            

        } else  if (choice == 3) {
            require(myMember.vitality >= 3);
            myMember.armMuscle += 1 * myMember.increaseRatio;
            myMember.vitality -= 3;
            
        } else  if (choice == 4) {
            require(myMember.vitality >= 7);
            myMember.legMuscle += 1 * myMember.increaseRatio;
            myMember.vitality -= 7;
            
        } else {
            
        }
        
        myMember.increaseRatio = 1;
        
    }
    
    //休息时体力值恢复到最大，每小时恢复一点体力值
    function RestBody (uint256 id) external {
        
        require(msg.sender == bodyToOwner[id]);
        
        member storage myMember = members[id];
        //还没休息 就进入休息状态
        if (myMember.state == 0) {

            myMember.state = 1;
        //否则表示休息完成 增加体力值
        } else {
            //计算经过的小时
            uint restHour = (now - myMember.LaststartRestTime)/3600;
            //每小时增加一个体力
            myMember.vitality += restHour;
            
            if (myMember.vitality > 10){
                myMember.vitality = 10;
            }
            //修改LaststartRestTime
            myMember.LaststartRestTime = now;
            //变成没休息的状态
            myMember.state = 0;

        }
        
    }
    
    
    //摄入充足营养会增加三倍效率
    function IncreaseNutrition(uint256 id) external {
        require(members[id].state == 0);
                
        require(msg.sender == bodyToOwner[id]);
        
        member storage myMember = members[id];
        
        myMember.increaseRatio = 3;
        
    }
    
    
    //学习知识会增加两倍的效率
    function StudyKnowledge(uint256 id) external {
        require(members[id].state == 0);
        
        require(msg.sender == bodyToOwner[id]);
        
        member storage myMember = members[id];
        
        myMember.increaseRatio = 2;
    }
    
}


