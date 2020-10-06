// ahaf\\jfhdjdhfhadfdjafh
var tree = [
  {
    text: "Project 1",
    nodes: [
      {
        text: "Sequence 1 ",

        nodes: [
          {
            text: "Task 1"
          },
          {
            text: "Task 2"
          }
        ]
      },
      {
        text: "Sequence 2"
      }
    ]
  },
  {
    text: "Project 2"
  },
  {
    text: "Project 2"
  },
  {
    text: "Project 4"
  },
  {
    text: "Project 5"
  }
];



$(document).ready(function () {
  //$(".sidebar-menu").treeview({ data: tree });
  let sidebarhtml = getnavList(tree);
  $(".sidebar-menu > ul").append(sidebarhtml);
  experiment()
  //console.log(getnavList(tree));
  $('#tree').treeview('toggleNodeExpanded', [$('#sidebar > div.sidebar-menu.treeview > ul > li.list-group-item.node-.node-selected'), { silent: true }]);

});
// $(".sidebar-dropdown > a").click(function () {
//   console.log('here');
//   $(".sidebar-submenu").slideUp(200);
//   if (
//     $(this)
//       .parent()
//       .hasClass("active")
//   ) {
//     $(".sidebar-dropdown").removeClass("active");
//     $(this)
//       .parent()
//       .removeClass("active");
//   } else {
//     $(".sidebar-dropdown").removeClass("active");
//     console.log($(this)
//       .next(".sidebar-submenu"));
//     $(this)
//       .next(".sidebar-submenu")
//       .slideDown(200);
//     $(this)
//       .parent()
//       .addClass("active");
//   }
// });
$(".sidebar-menu").click(function (evt) {
  console.log('selected')
  console.log(evt.target);
  if ($(evt.target).parent().hasClass("sidebar-dropdown") || $(evt.target).parent().parent().hasClass("sidebar-dropdown")) {
    let selected = $(evt.target).parent().hasClass("sidebar-dropdown") ? $(evt.target) : $(evt.target).parent();
    if (selected.parent()
      .hasClass("active")) {
      selected.parent().removeClass("active");
      selected.nextAll('.childmenu').slideUp(200);
      selected.nextAll('.sidebar-submenu').slideUp(200);
    }
    else {
      selected.parent().addClass("active")
      selected.nextAll('.childmenu').slideDown(200);
      selected.nextAll('.sidebar-submenu').slideDown(200);
    }

  }
})

$("#close-sidebar").click(function () {
  $(".page-wrapper").removeClass("toggled");
});
$("#show-sidebar").click(function () {
  if ($(".page-wrapper").hasClass("toggled")) {
    $(".page-wrapper").removeClass("toggled");
  }
  else {
    $(".page-wrapper").addClass("toggled");
  }
});

function getnavList(data, index = 0) {
  console.log(index + 'is the index ');
  console.log(data)
  let htmlstring = ""
  data.forEach(obj => {
    if ('nodes' in obj) {

      console.log('\n hello')
      //let tempstring = `<li> <a href="#"><i class="fa fa-calendar"></i>${index == 0 ? '' : '<div id="list-space"></div>'.repeat(index)}<span>${obj.text}</span> </a></li>`
      htmlstring += $(`<div class="sidebar-dropdown ${index == 0 ? '' : 'childmenu'}"><a href="#">${index == 0 ? '' : '<span id="list-space">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>'.repeat(index)}<i class="fa fa-folder" aria-hidden="true"></i><span>${obj.text}</span> </a></div>`).append(getnavList(obj.nodes, index + 1)).prop('outerHTML');

    } else
      htmlstring += `<div class="sidebar-${index == 0 ? 'dropdown' : 'submenu'}"> <a href="#">${index == 0 ? '' : '<span id="list-space">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>'.repeat(index)}<i class="fa fa-folder" aria-hidden="true"></i><span>${obj.text}</span> </a></div>`
  });
  console.log('the result is' + index);
  console.log(htmlstring);
  return htmlstring;

}
function experiment() {
  let ele1 = '<li><li></li><li></li></li>'
  console.log($('<li></li>').append((ele1)).prop('outerHTML'));
  let ele2 = '<div><div></div><div></div></div>'
  console.log($('<div></div>').append((ele2)).prop('outerHTML'));
}