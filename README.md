## 一、项目说明
一个使用MVC编程思想，并基于jQuery封装的一个随机分组的小程序

## 二、应用场景
如果你在纠结人员分配方面的问题，这个小程序可能可以帮助你把这件纠结且难决策的事件变成一件快乐的事情

## 三、如何使用
直接下载运行`index.html`文件
[下载地址](https://github.com/calcyu/RandomGroup/archive/gh-pages.zip)

## 四、配置
该随机分组小程序可以进行简单的配置

### 4.1 名单修改
名单数据结构为：
```
{
    "leader":["组长1","组长2"],
    "member":["组员1","组员2"]
}
```
方法1：
直接修改`names.js`文件

方法2：
指定`url`属性动态异步加载
```
    $("#root").randomAllocation({
        url:'names.json',
    });
```
### 4.2 小组数修改
通过`groupCount`指定总共有多少个小组
```
    $("#root").randomAllocation({
        groupCount: 5, //小组数
    });
```
### 4.3 每组最大人数
```
    $("#root").randomAllocation({
        groupSize: 6, //每组最大人数
    });
```
