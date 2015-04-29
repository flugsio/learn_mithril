// helps with debugging code that is eating errors
// use like this m("button", {onclick: thrw(todo.vm.add), id: "hej"}, "Add")
var thrw = function(callback, object) {
  return function() {
    try {
      return callback.call(object);
    } catch(e) {
      console.log(e);
    }
  };
}

var todo = {};

todo.Todo = function(data) {
  this.description = m.prop(data.description);
  this.done = m.prop(false);
};

todo.TodoList = Array;

todo.vm = (function() {
  var vm = {}
  vm.init = function() {
    vm.list = new todo.TodoList();
    vm.description = m.prop('');

    vm.add = function() {
      if (vm.description()) {
        vm.list.push(new todo.Todo({description: vm.description()}));
        vm.description("");
      }
    };
  };
  return vm;
}());

todo.controller = function() {
  todo.vm.init();
}

todo.view = function() {
  var vm = todo.vm;
  return m("html", [
      m("body", [
        m("input", {
          onchange: m.withAttr("value", vm.description),
          value: vm.description()
        }),
        m("button", {onclick: thrw(todo.vm.add), id: "hej"}, "Add"),
        m("table", [
          todo.vm.list.map(function(task, index) {
            return m("tr", [
                m("td", [
                  m("input[type=checkbox]", {
                    onclick: m.withAttr("checked", task.done),
                    checked: task.done()
                  })
                ]),
                m("td",
                  {class: task.done() ? "done" : ""},
                  task.description()
                )
            ])
          })
        ])
      ])
  ]);
};
