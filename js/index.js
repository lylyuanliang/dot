// https://blog.csdn.net/weixin_39405946/article/details/100544439
layui.use(["form", "element", "table", "laydate"], function () {
    let form = layui.form;
    let $ = layui.$;
    let layer = layui.layer;
    let element = layui.element;
    let table = layui.table;
    let laydate = layui.laydate;

    let index = new Index();

    var map = L.map('map').setView([37.002553, 106.890747], 3)
    L.esri.tiledMapLayer({
        url: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer'
    }).addTo(map);
// 添加标记点
//     var marker = L.marker([38.761954, 117.775429]).addTo(map)

    $("body").on("click", "#doDot", function () {
        let lonLatInfo = $("#lonLatI").val();
        if (!lonLatInfo) {
            layer.msg("经纬度不能为空")
            return ;
        }
        index.marker(lonLatInfo, L, map)
    });

    $("body").on("focus", "#lonLatI", function () {
        layer.tips('点击展开按钮查看样例', '#lonLatI', {
            tips: 3,
            time: 4000
        });
    });

    $("body").on("click", "#colspan", function () {
        layer.open({
            title: `${index.getDemo()}`,
            type: 2,
            area: ['700px', '450px'],
            fixed: false, //不固定
            maxmin: true,
            content: '../html/lonLatColspan.html'
        });
    });



//添加圆形
//     var circle = L.circle([38.761954, 117.575429], {
//         color: 'red',
//         fillColor: '#f03',
//         fillOpacity: 0.5,
//         radius: 500
//     }).addTo(map)
// 添加多边形
//     var polygon = L.polygon([
//         [38.561954, 117.675429],
//         [38.561954, 117.475429],
//         [38.361954, 117.375429]
//     ]).addTo(map)

    // var popup = L.popup()
    // map.on('click', function (e) {
    //     popup
    //         .setLatLng(e.latlng)
    //         .setContent(e.latlng.toString())
    //         .openOn(map)
    // })


});

class Index{
    constructor() {
       this.groups = [];
    }

    /**
     * 打点
     * @param lonLatArray 经纬度信息
     * 多个点 json格式 [
     {"lat":23.140833,"lon":113.305649},
     {"lat":23.138604,"lon":113.306835},
     {"lat":23.138535,"lon":113.305821}
     ]
     单个点 {"lat":23.140833,"lon":113.305649}, 或者23.140833,113.305649
     * @param L
     * @param map
     */
    marker(lonLatArrayInfo, L, map) {
        let lonLatArray = [];
        if (lonLatArrayInfo.startsWith("[")) {
            lonLatArray = JSON.parse(lonLatArrayInfo);
        }else if(lonLatArrayInfo.startsWith("{")) {
            let lonLatObj = JSON.parse(lonLatArrayInfo);
            lonLatArray.push(lonLatObj);
        }else {
            let lonLat = lonLatArrayInfo.split(",");
            let lonLatObj = {
                lat: lonLat[0],
                lon: lonLat[1]
            };
            lonLatArray.push(lonLatObj);
        }
        let group = L.layerGroup().addTo(map);
        // 清除点
        this.clearLayers();
        lonLatArray.forEach((lonLatObj, i)=>{
            // 设置图标
            // let icon = new L.icon({
            //      iconUrl: ' /static/icon/icon.png' ,//图标路径
            //      iconSize: [32, 32],
            //      iconAnchor: [16, 32]
            //  });

            let lat = lonLatObj.lat;
            let lon = lonLatObj.lon;
            let marker = L.marker([lat, lon],{
                // icon:blueIcon,
                // draggable:true,
                // riseOnHover:true
            }).addTo(group).bindPopup('第'+(i+1)+"个点")
        });
        this.addGroup(group);
    }

    /**
     * 清除点
     */
    clearLayers() {
        this.groups.forEach(group =>  group.clearLayers());
        this.groups = [];
    }
    addGroup(group) {
        this.groups.push(group);
    }

    getDemo() {
        let demo = '多个点' +
            '<strong>[{"lat":23.140833,"lon":113.305649}]</strong>' +
            '单个点 ' +
            '<strong>{"lat":23.140833,"lon":113.305649}</strong>或者<strong>23.140833,113.305649</strong>';
        return `<div style="font-size: 0.75em;">${demo}</div>`;

    }

    valid(lonLatInfo) {

    }
}



