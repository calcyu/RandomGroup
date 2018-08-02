;(function ($, window, document, undefined) {
    //mvc思想
    $.fn.randomAllocation = function (options) {
        var _root = $(this);
        //数据助手
        var DataHelper = function (settings, callback) {
            this.__proto__ = {
                init: function () {
                    var _this = this;
                    $.getJSON(settings.url, function (d) {
                        _this.leader = d.leader;
                        _this.member = d.member;
                        _this.total = d.leader.length + d.member.length;
                        settings.total = _this.total;
                        if (_this.total < settings.groupSize) {
                            alert("不要闹！人数太少不够分");
                        } else {
                            callback();
                        }
                    })
                },
                randomName: function () {
                    if (Math.random() * 2 - 1 > 0) {
                        return this.leader[Math.floor(Math.random() * this.leader.length)];
                    } else {
                        return this.member[Math.floor(Math.random() * this.member.length)];
                    }
                },
                selectName: function (type) {
                    if (type.toUpperCase() == "L") {
                        return this.leader.splice(Math.floor(Math.random() * this.leader.length), 1);
                    } else {
                        return this.member.splice(Math.floor(Math.random() * this.member.length), 1)
                    }
                },
                mergeGroup: function () {
                    this.member = this.member.concat(this.leader);
                }


            }
            this.init();
        }
        var ViewHelper = function (root, settings) {
            this.__proto__ = {}

            function initView() {
                this.box = $("<div class='random-box'></div>");
                this.btn = $("<button id='btn'>暂停</button>");
                this.tb = $("<table  border='1' class='tb'></table>")
                root.append(this.box);
                root.append(this.btn);
                root.append(this.tb);
                //分组思路：总数/5，剩余人数分摊到每一组
                //要求每组至少5人
                var col = Math.floor(settings.total / settings.groupSize);
                settings.groupCount = col;
                var element = [];
                //标题
                element.push("<tr>");
                for (var j = 0; j < col; j++) {
                    element.push("<th>第" + (j + 1) + "组</th>");
                }
                element.push("</tr>");
                //基本组
                for (var i = 0; i < settings.groupSize; i++) {
                    if (i == 0) {
                        element.push("<tr class='leader'>")
                    } else {
                        element.push("<tr>");
                    }
                    for (var j = 0; j < col; j++) {
                        element.push("<td></td>");
                    }
                    element.push("</tr>");
                }
                //处理剩余人数
                var remainder = settings.total % settings.groupSize;
                while (remainder > 0) {
                    element.push("<tr>");
                    var c = remainder < col ? remainder : col;
                    for (var j = 0; j < c; j++) {
                        element.push("<td></td>");
                    }
                    element.push("</tr>");
                    remainder -= c;
                }
                this.tb.append(element.join(""));
            }

            initView();
        }
        var RandomHelper = function (data, settings) {
            this.__proto__ = {
                start: function () {
                    function bb() {
                        if (settings.isSelecting) {
                            var name1 = $(".random-box span:last").text();
                            $(".person-box").remove();

                            if (!name1) {
                                name1 = data.randomName();
                            }
                            var name2 = data.randomName();
                            $(".random-box").append("<div class='person-box'><span>" + name1 + "</span><span>" + name2 + "</span></div>");
                            $(".person-box:last").animate({
                                left: "-100px"
                            }, settings.rollSpeed);
                        }
                    }

                    setInterval(bb, settings.rollSpeed);
                    $("#btn").click(function () {
                        if (settings.selectedCount == settings.total) {
                            return;
                        }
                        if (settings.isSelecting) {
                            var name;
                            //先选组长
                            if (settings.selectedCount < settings.groupCount) {
                                name = data.selectName("L");
                            } else {
                                name = data.selectName("M");
                            }
                            $("span:last").text(name);
                            $("td").eq(settings.selectedCount++).append(name);
                            $(this).text("开始");
                            //如果是选最后一个组长把候选组长合并到组员中
                            if (settings.selectedCount == settings.groupCount) {
                                data.mergeGroup();
                            }
                        } else {
                            $(this).text("暂停");
                        }
                        settings.isSelecting = !settings.isSelecting;
                    })

                }
            }
        }
        //初始参数
        var settings = $.extend({
            url: "names.json",
            isSelecting: true,
            groupSize: 5,
            rollSpeed: 100,
            selectedCount: 0,
            groupCount: 0
        }, options);

        //初始化名单
        var data = new DataHelper(settings, function () {
            //初始化VIEW
            var view = new ViewHelper(_root, settings);
            //开始随机分配
            var random = new RandomHelper(data, settings);
            random.start()
        });

    };
})(jQuery, window, document);