整个plugin入口[index.js](index.js)

这里创建了两种类型的plugin，app和docViews。其中app是独占左边导航栏一行的，有自己独立的panel。docViews是插入每一条doc界面的panel，可以为doc做定制功能。比如改变doc的显示方式，为doc做计算，增加链接等等。

docViews panel 使用DocViewsRegistryProvider注册新的panel，需要添加固定模板[no_template.html](public/no_template.html)。模版里可以定义一些变量，由controller负责传入变量。

app 的文件有test_vis_app_controller.js/test_vis_app.html/test_vis_app.js，其中test_vis_app.js，只是设定了template和defaultSearchStrategy。
test_vis_app.html是默认模版，包含一个select控件，test_vis_app_controller，选项是visualizationList里的所有content。另外包含一个test-vis-app-visualize，当选中的事件发生后，就会在这个控件中展示出来。
