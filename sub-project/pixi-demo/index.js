/* eslint-disable default-case */

/**
 * ?json : 加载 demo/test.json
 * ?sourceid=xxx : 加载精品资源实验sourceid
 */
$(() => {
    var main;
    var isOnAdd = false;
    var allEqAry = [];
    var lastType;
    var serachTimer;
    var prepareDragEq = false;
    var isDragEq = false;
    var isSlideEq = false;
    var slideSpeed = 0;
    var intervalId;
    var eqsContainer = $("#eqLib");
    var borderHeight = 0;
    var lastSlideY;
    var domNode;
    var clickAddEqMap = new Map();
    var eqsDistance = 100;
    var eqListAry;

    var originPos = {
        x: 0,
        y: 0
    };
    var originLocalPos = {
        x: 0,
        y: 0
    };
    var currentDrag = {
        dom: null,
        obj: null
    };

    window.forceShowAllEqs = localStorage.getItem("forceShowAllEqs")
        ? true
        : false;

    window.addEq = async function(type, eqName, pos) {
        if (isOnAdd) {
            return;
        }
        isOnAdd = true;
        if (type < 5) {
            if (!pos) {
                var addEqObj = clickAddEqMap.get(eqName) || {
                    angleCount: 0,
                    disCount: 0
                };
                const sacle = main.viewStack.scale.x;
                var a =
                    addEqObj.disCount === 0
                        ? 0
                        : Math.PI / 2 / addEqObj.disCount;
                var xx =
                    Math.cos(addEqObj.angleCount * a) *
                    addEqObj.disCount *
                    eqsDistance *
                    sacle;
                var yy =
                    Math.sin(addEqObj.angleCount * a) *
                    addEqObj.disCount *
                    eqsDistance *
                    sacle;
                addEqObj.angleCount++;
                if (
                    addEqObj.disCount === 0 ||
                    addEqObj.angleCount % (addEqObj.disCount * 4) === 0
                ) {
                    addEqObj.disCount++;
                    addEqObj.angleCount = 0;
                }
                clickAddEqMap.set(eqName, addEqObj);
                pos = {
                    x: window.innerWidth / 2 + xx,
                    y: window.innerHeight / 2 + yy
                };
            }
            main.execute(NBCommand.ADD_EQUIPMENT, {
                name: eqName,
                pos
            });
        } else {
            const res = await fetch(`assets/model/data/${eqName}.json`);
            const data = await res.json();
            setData(data);
        }
        isOnAdd = false;
    };

    window.mouseDownBlock = function(event, index, eqName) {
        event = event || window.event;
        prepareDragEq = true;
        originPos.x = event.clientX;
        originPos.y = event.clientY;
        originLocalPos.x = event.offsetX;
        originLocalPos.y = event.offsetY;
        currentDrag.obj = {
            index,
            eqName
        };
        currentDrag.dom = event.target;
    };

    loadChemData();

    async function loadChemData() {
        let labData = localStorage.getItem("test-lab-data");
        if (location.href.includes("json")) {
            // 加载 test.json
            const res = await fetch("test.json");
            labData = await res.json();
        } else if (location.href.includes("sourceid=")) {
            const id = location.href.split("sourceid=")[1].replace("res-", "");
            const res = await fetch(`assets/model/data/${id}.json`);
            labData = await res.json();
        } else if (location.href.includes("localid=")) {
            const id = location.href.split("localid=")[1];
            labData = localStorage.getItem(id);
        }
        // 添加场景
        addCanvas(labData);
    }

    // 函数部分
    // 初始化部分
    function addCanvas(data) {
        var canvasContainer = document.querySelector("#canvas");
        main = new ChemicalMain({
            canvas: canvasContainer
        });
        window.chemicalMain = main;
        initList();
        nb.isDebug = localStorage.getItem("showDebugger") ? true : false;

        main.on("loaded", () => {
            setData(data);
        });
    }

    function setData(data) {
        if (!data) return;
        if (data.id) {
            main.execute(NBCommand.SHOW_EXPERIMENT_BY_ID, data);
        } else {
            data = data.chemData ? data.chemData : data;
            main.execute(NBCommand.RESTORE_DATA, data);
        }
    }

    function initList() {
        fetch("allEquipmentMessage.json")
            .then(data => data.json())
            .then(ary => {
                eqListAry = ary;
                initEqListData();
            });
    }

    function initEqListData() {
        let htmlStr = "";
        allEqAry.length = 0;
        eqListAry.forEach((item, index) => {
            item.equipments.forEach(eq => {
                if (!eq.hidden || eq.isOrganic || window.forceShowAllEqs) {
                    let o = {
                        idx: allEqAry.length,
                        type: index,
                        eqName: eq.eqName,
                        search: eq.search.zh
                    };
                    allEqAry.push(o);
                    htmlStr += `<div class = "libItem eq-type-${index}" eqName = ${eq.eqName} onclick="addEq('${index}', '${eq.eqName}')"  onmousedown="mouseDownBlock(event,'${index}','${eq.eqName}')">
                                  <img class = "eqImg" src="${eq.img}"></img>
                                  <div class = "eqName">${eq.name}</div>
                                </div>`;
                }
            });
        });
        const eqLibDom = document.querySelector("#eqLib");
        eqLibDom.innerHTML = htmlStr;
        showEqLibByType(0);
    }

    // ------- 拖拽 ------- //
    $("#eqLib").on("dragstart", evt => {
        $(event.target).attr("opacity", 0.1);
    });
    $(document).on("dragend", evt => {
        const definitionName = $(evt.target).attr("value");
        main.execute(main.NBCommand.ADD_EQUIPMENT, {
            pos: {
                x: evt.clientX,
                y: evt.clientY
            },
            data: {
                definitionName
            }
        });
        console.log("******添加器材：", definitionName);
    });

    $(window).on("mousemove", event => {
        switch (true) {
            case prepareDragEq:
                let dis = {
                    x: event.clientX - originPos.x,
                    y: event.clientY - originPos.y
                };
                if (Math.sqrt(Math.pow(dis.x, 2) + Math.pow(dis.y, 2)) > 40) {
                    prepareDragEq = false;
                    if (dis.x < 0 && Math.abs(dis.y) < -dis.x) {
                        isDragEq = true;
                        isSlideEq = false;
                    } else {
                        isDragEq = false;
                        isSlideEq = true;
                    }
                    prepareDragEq = false;
                }
                break;
            case isDragEq:
                if (!domNode) {
                    domNode = currentDrag.dom.cloneNode(true);
                    domNode.style.height = currentDrag.dom.clientHeight + "px";
                    domNode.style.width = currentDrag.dom.clientWidth + "px";
                    domNode.className = "showedDragElement";
                    document.body.appendChild(domNode);
                }
                domNode.style.left = event.clientX - originLocalPos.x + "px";
                domNode.style.top = event.clientY - originLocalPos.y + "px";
                break;
            case isSlideEq:
                if (!lastSlideY) {
                    lastSlideY = event.clientY;
                } else {
                    clearInterval(intervalId);
                    slideSpeed = event.clientY - lastSlideY;
                    lastSlideY = event.clientY;
                    let maxHeight =
                        eqsContainer[0].scrollHeight -
                        eqsContainer[0].clientHeight;

                    let disTop = borderHeight - eqsContainer[0].scrollTop;
                    let disBottom =
                        eqsContainer[0].scrollTop - maxHeight + borderHeight;
                    if (disTop > 0 && slideSpeed > 0) {
                        slideSpeed = slideSpeed / (disTop * 0.02 + 1);
                    } else if (disBottom > 0 && slideSpeed < 0) {
                        slideSpeed = slideSpeed / (disBottom * 0.02 + 1) - 1;
                    }
                    eqsContainer[0].scrollTop -= slideSpeed;
                }
                break;
        }
    });

    $(window).on("mouseup", event => {
        if (prepareDragEq) {
            prepareDragEq = false;
        }
        if (isSlideEq) {
            tweenLig(slideSpeed * 1.2);
        }
        prepareDragEq = false;
        isDragEq = false;
        isSlideEq = false;
        if (domNode) {
            document.body.removeChild(domNode);
            domNode = null;
            if (event.clientX < eqsContainer.offset().left) {
                let pos;
                if (currentDrag.obj.index < 5) {
                    pos = {
                        x: event.clientX - originLocalPos.x,
                        y: event.clientY - originLocalPos.y
                    };
                }
                let obj = currentDrag.obj;
                addEq(obj.index, obj.eqName, pos);
            }
        }
        lastSlideY = null;
    });

    window.toggleEqLib = function() {
        $("#listDiv").toggleClass("hide-listdiv");
    };

    window.showEqLibByType = function(type) {
        $("#listDiv").removeClass("hide-listdiv");
        if (lastType === type || type > 5) {
            return;
        }
        lastType = type;
        $(".search-ipt").val("");
        $("#eqLib").scrollTop(0);
        $(".tab-item.selected").removeClass("selected");
        $(`.tab-item:nth-child(${type + 1})`).addClass("selected");
        $(".libItem").addClass("is-hide");
        $(`.eq-type-${type}`).removeClass("is-hide");
    };

    window.search = function(value) {
        throttle(value);
    };

    function tweenLig(speed) {
        clearInterval(intervalId);
        if (
            speed === 0 &&
            eqsContainer[0].scrollTop >= borderHeight &&
            eqsContainer[0].scrollTop <=
                eqsContainer[0].scrollHeight -
                    eqsContainer[0].clientHeight -
                    borderHeight
        ) {
            return;
        }
        let s = -1;
        if (speed > 0) {
            s = 1;
        }
        if (eqsContainer[0].scrollTop < borderHeight) {
            speed = (borderHeight - eqsContainer[0].scrollTop) / 20;
            intervalId = setInterval(() => {
                eqsContainer[0].scrollTop += speed;
                if (eqsContainer[0].scrollTop >= borderHeight) {
                    clearInterval(intervalId);
                    eqsContainer[0].scrollTop = borderHeight;
                }
            }, 20);
            return;
        }
        let bottom =
            eqsContainer[0].scrollHeight -
            eqsContainer[0].clientHeight -
            borderHeight;
        if (
            eqsContainer[0].scrollTop !== borderHeight &&
            eqsContainer[0].scrollTop > bottom
        ) {
            if (
                eqsContainer[0].scrollHeight - 2 * borderHeight <
                eqsContainer[0].clientHeight
            ) {
                speed = (borderHeight - eqsContainer[0].scrollTop) / 20;
                intervalId = setInterval(() => {
                    eqsContainer[0].scrollTop += speed;
                    if (eqsContainer[0].scrollTop <= borderHeight) {
                        clearInterval(intervalId);
                        if (
                            Math.abs(
                                eqsContainer[0].scrollTop - borderHeight
                            ) <= 1
                        ) {
                            eqsContainer[0].scrollTop = borderHeight;
                        }
                    }
                }, 20);
                return;
            } else {
                speed = (bottom - eqsContainer[0].scrollTop) / 20;
                intervalId = setInterval(() => {
                    eqsContainer[0].scrollTop += speed;
                    if (eqsContainer[0].scrollTop <= bottom) {
                        clearInterval(intervalId);
                        if (
                            Math.abs(
                                eqsContainer[0].scrollTop - borderHeight
                            ) <= 1
                        ) {
                            eqsContainer[0].scrollTop = borderHeight;
                        } else {
                            eqsContainer[0].scrollTop = bottom;
                        }
                    }
                }, 20);
                return;
            }
        }
        intervalId = setInterval(() => {
            eqsContainer[0].scrollTop -= speed + s * 0.4;
            if (Math.abs(speed) < 0.1 || (speed + s * 0.4) * speed < 0) {
                clearInterval(intervalId);
                return;
            }
            if (eqsContainer[0].scrollTop <= borderHeight) {
                clearInterval(intervalId);
                eqsContainer[0].scrollTop = borderHeight;
                return;
            }
            if (eqsContainer[0].scrollTop >= bottom) {
                clearInterval(intervalId);
                eqsContainer[0].scrollTop = bottom;
            }
        }, 20);
    }

    function throttle(value) {
        if (serachTimer) {
            clearTimeout(serachTimer);
        }
        serachTimer = setTimeout(() => {
            searchContent(value);
            clearTimeout(serachTimer);
            serachTimer = null;
        }, 150);
    }

    function searchContent(value) {
        value = value.replace(/\s/gi, "");
        if (value === "") {
            return showEqLibByType(0);
        } else {
            lastType = 1000;
            $(".tab-item.selected").removeClass("selected");
            $("#eqLib").scrollTop(0);
            $(".libItem").addClass("is-hide");
            value = value.toLowerCase();
            let s = "";
            for (let i = 0; i < value.length; i++) {
                s += `.*${value[i]}`;
            }
            s += `.*`;
            let p = new RegExp(s);
            allEqAry.forEach((item, index) => {
                if (p.test(item.search)) {
                    $(`.libItem:nth-child(${index + 1})`).removeClass(
                        "is-hide"
                    );
                }
            });
        }
    }

    window.setGrade = grade => {
        localStorage.setItem("NB_GRADE_ID", grade);
    };

    window.getData = () => {
        const res = chemicalMain.execute(NBCommand.GET_DATA);
        console.log(JSON.stringify(res));
    };

    window.toggleDebug = () => {
        const selectedObj = chemicalMain.viewStack.selectionLayer.selectedObj;
        if (!selectedObj || !selectedObj[0]) {
            nb.isDebug = !nb.isDebug;
            localStorage.setItem("showDebugger", nb.isDebug ? "true" : "");
            return;
        }
        const selectedEq = selectedObj[0];
        const isDebug = !selectedEq.conf_show_mol;

        // 是否显示温度
        selectedEq.conf_show_temp = isDebug;
        // 是否显示体积
        selectedEq.conf_show_volume = isDebug;
        // 是否显示摩尔
        selectedEq.conf_show_mol = isDebug;
        // 显示化学方程式
        selectedEq.conf_chemical_equation = isDebug;
        // 是否显示浓度信息
        selectedEq.conf_show_sol = isDebug;
        // 显示质量
        selectedEq.conf_show_weight = isDebug;
        // 只显示名字
        selectedEq.conf_show_name = isDebug;
    };

    window.toggleShowAllEqs = () => {
        window.forceShowAllEqs = !window.forceShowAllEqs;
        localStorage.setItem(
            "forceShowAllEqs",
            window.forceShowAllEqs ? "true" : ""
        );
        initEqListData();
    };
});
