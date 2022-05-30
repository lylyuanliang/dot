layui.use(["form", "element", "table", "laydate"], function () {
    let form = layui.form;
    let $ = layui.$;
    let layer = layui.layer;
    let element = layui.element;
    let table = layui.table;
    let laydate = layui.laydate;

    let value = parent.document.querySelector('#lonLatI').value;
    if (value) {
        $('[name="lonLatInfo"]').val(value);
    }

    $("body").on("click", "#doDot", function () {
        parent.document.querySelector('#lonLatI').value = $('[name="lonLatInfo"]').val();
        parent.document.querySelector("#doDot").click();
        let index = parent.layer.getFrameIndex(window.name); //获取窗口索引
        parent.layer.close(index);
    });

    $("body").on("click", "#doCopy", function () {
        let demo = '[\n' +
            '     {"lat":23.140833,"lon":113.305649},\n' +
            '     {"lat":24.138604,"lon":113.306835},\n' +
            '     {"lat":25.138535,"lon":113.305821}\n' +
            '     ]';

        copyText(demo);

        layer.msg("成功复制到剪切板");
    });

    function copyText(text) {
        var textarea = document.createElement("input");//创建input对象
        var currentFocus = document.activeElement;//当前获得焦点的元素
        document.body.appendChild(textarea);//添加元素
        textarea.value = text;
        textarea.focus();
        if(textarea.setSelectionRange)
            textarea.setSelectionRange(0, textarea.value.length);//获取光标起始位置到结束位置
        else
            textarea.select();
        try {
            var flag = document.execCommand("copy");//执行复制
        } catch(eo) {
            var flag = false;
        }
        document.body.removeChild(textarea);//删除元素
        currentFocus.focus();
        return flag;
    }
});