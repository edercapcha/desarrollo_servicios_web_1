function fn_create_table(data, contenedor, search) {
        
    if (data != "" || data.length != 0) {
        
        // EXTRACT VALUE FOR HTML HEADER. 
        // ('Book ID', 'Book Name', 'Category' and 'Price')
        var col = [];
        for (var i = 0; i < data.length; i++) {
            for (var key in data[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }      

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");
        table.setAttribute('class', 'table table-striped table-bordered table-hover no-footer');
        table.setAttribute('id', 'DataTable');

        var thead = document.createElement("thead");
        table.appendChild(thead);

        var trh = thead.insertRow(-1);                  // TABLE ROW.
        trh.setAttribute('class', 'font-small');

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            trh.appendChild(th);
        }

        var tbody = document.createElement("tbody");
        tbody.setAttribute('class', 'font-small');
        table.appendChild(tbody);
        for (var i = 0; i < data.length; i++) {

            tr = tbody.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                if (data[i][col[j]] != null)
                    tabCell.innerHTML = data[i][col[j]];
                else
                    tabCell.innerHTML = "";

            }

        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        contenedor.innerHTML = "";
        table.innerHTML = table.innerHTML.replace(/_/g, " ");
        table.innerHTML = table.innerHTML.replace("CHKSELECCIONAR", "<input id='chkSeleccionar' onclick='fn_SelleccionarTodo();' type='checkbox'/> ");
        var divSearch = ' <div class="well-search-tab "  style="height:36px;"><div class="form-horizontal"> <div class="form-group has-info"><div class="col-sm-2"><label class="col-sm-2 control-label">Buscar:</label>'+
                        '</div><div class="col-sm-4"> <input type="input"  maxlength="65" class="form-control" id="search_table" placeholder="Ingrese la busqueda " ></div><div class="col-sm-4">  <label class="col-sm-3 control-label">' +
                        'Mostrar:</label><div class="col-sm-4"><select id="cboMostrar" class="col-sm-1 form-control" ><option value="10">10</option><option value="20">20</option><option value="50">50</option><option value="100">100</option><option value="-1">'+
                        'Todos</option></select></div> </div></div></div></div>'
        search.html(divSearch);
        contenedor.html(table);

        
    }
    else
    {
        var objStrMensaje = '<div class="alert alert-info">No se encontraron registros.</div>'
        contenedor.innerHTML = "";
        contenedor.html(objStrMensaje);
    }

    $("#search_table").keypress(function (e) {
        var regex = new RegExp("[(A-Za-z0-9 )]");
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
            return true;
        }

        e.preventDefault();
        return false;
    });
}

function fn_change_pagination(cantidad)
{ alert(cantidad); }

function fn_add_properties_table(ObjTable) {
    var table= ObjTable.DataTable(
						{
						    "dom": "<'row'<'col-sm-12'<'pull-left'>>>" +
									"<'row'<'col-sm-12'tr>>" +
									"<'row'<'col-sm-5'i><'col-sm-7'p>>",
						    "autoFill": {
						        "columns": [1, 2],
						        "focus": 'click',
						    },
						  
						   
						    "language": {
	
						        "lengthMenu": "Mostrar _MENU_ registros por página",
						        
						        "zeroRecords": "No se encontraron resultados con el criterio de búsqueda ingresado",
						        "info": "Página _PAGE_ de _PAGES_ de: _TOTAL_ registros",
						        "infoEmpty": "",
						        "search": "Buscar _INPUT_",
						        "infoFiltered": "(Filtrado de _MAX_ Registros)",
						        "paginate": {
						            "first": "Primero",
						            "last": "Ultimo",
						            "next": "Siguiente",
						            "previous": "Anterior"
						        },
						    }
						}

					);
   
     $('#search_table').on('keyup', function () {
         table.search(this.value).draw();
     });

     $('#cboMostrar').on('change', function () {

         table.page.len($("#cboMostrar").val()).draw();
        });

     $("#btnMostrarTodo").on('click', function ()  {
         if (this.innerText == "Mostrar Ampliado") {
             this.innerText = "Mostrar Recomendado";
             table.page.len(100).draw();
             
         }
         else {
             this.innerText = "Mostrar Ampliado";
             table.page.len(10).draw();
         }
     });


}
function fn_add_properties_table2(ObjTable, sColumDefs, sColumOrder) {
    var table = ObjTable.DataTable(
        {
            "dom": "<'row'<'col-sm-12'<'pull-left'>>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-5'i><'col-sm-7'p>>",
            "autoFill": {
                "columns": [1, 2],
                "focus": 'click',
            },
            columnDefs: sColumDefs,
            order: sColumOrder,
            "language": {
                "lengthMenu": "Mostrar _MENU_ registros por página",
                "zeroRecords": "No se encontraron resultados con el criterio de búsqueda ingresado",
                "info": "Página _PAGE_ de _PAGES_ de: _TOTAL_ registros",
                "infoEmpty": "",
                "search": "Buscar _INPUT_",
                "infoFiltered": "(Filtrado de _MAX_ Registros)",
                "paginate": {
                    "first": "Primero",
                    "last": "Ultimo",
                    "next": "Siguiente",
                    "previous": "Anterior"
                },
            }
        }

    );

    $('#search_table').on('keyup', function () {
        table.search(this.value).draw();
    });

    $('#cboMostrar').on('change', function () {

        table.page.len($("#cboMostrar").val()).draw();
    });

    $("#btnMostrarTodo").on('click', function () {
        if (this.innerText == "Mostrar Ampliado") {
            this.innerText = "Mostrar Recomendado";
            table.page.len(100).draw();

        }
        else {
            this.innerText = "Mostrar Ampliado";
            table.page.len(10).draw();
        }
    });


}

function fn_add_properties_table_checkall(ObjTable) {
    var table = ObjTable.DataTable(
						{
						    "dom": "<'row'<'col-sm-12'<'pull-left'>>>" +
									"<'row'<'col-sm-12'tr>>" +
									"<'row'<'col-sm-5'i><'col-sm-7'p>>",
						    "autoFill": {
						        "columns": [1, 2],
						        "focus": 'click',
						    },


						    "language": {
						        "lengthMenu": "Mostrar _MENU_ registros por página",
						        "zeroRecords": "No se encontraron resultados con el criterio de búsqueda ingresado",
						        "info": "Página _PAGE_ de _PAGES_ de: _TOTAL_ registros",
						        "infoEmpty": "",
						        "search": "Buscar _INPUT_",
						        "infoFiltered": "(Filtrado de _MAX_ Registros)",
						        "paginate": {
						            "first": "Primero",
						            "last": "Ultimo",
						            "next": "Siguiente",
						            "previous": "Anterior"
						        },
						    },
						    'columnDefs': [{
						        'targets': 0,
						        'searchable': false,
						        'orderable': false
						    }],
						    'ordering': false
						}
					);

    $('#search_table').on('keyup', function () {
        table.search(this.value).draw();
    });

    $('#cboMostrar').on('change', function () {

        table.page.len($("#cboMostrar").val()).draw();
    });

    $("#btnMostrarTodo").on('click', function () {
        if (this.innerText == "Mostrar Ampliado") {
            this.innerText = "Mostrar Recomendado";
            table.page.len(100).draw();

        }
        else {
            this.innerText = "Mostrar Ampliado";
            table.page.len(10).draw();
        }
    });
}

function fn_add_properties_table_checkall_ventas(ObjTable) {
    var table = ObjTable.DataTable(
						{
						    "dom": "<'row'<'col-sm-12'<'pull-left'>>>" +
									"<'row'<'col-sm-12'tr>>" +
									"<'row'<'col-sm-5'i><'col-sm-7'p>>",
						    "autoFill": {
						        "columns": [1, 2],
						        "focus": 'click',
						    },


						    "language": {
						        "lengthMenu": "Mostrar _MENU_ registros por página",
						        "zeroRecords": "No se encontraron resultados con el criterio de búsqueda ingresado",
						        "info": "Página _PAGE_ de _PAGES_ de: _TOTAL_ registros",
						        "infoEmpty": "",
						        "search": "Buscar _INPUT_",
						        "infoFiltered": "(Filtrado de _MAX_ Registros)",
						        "paginate": {
						            "first": "Primero",
						            "last": "Ultimo",
						            "next": "Siguiente",
						            "previous": "Anterior"
						        },
						    },
						    'columnDefs': [{
						        'targets': 0,
						        'searchable': false,
						        'orderable': false
						    }],
						    'ordering': true
						}
					);

    $('#search_table').on('keyup', function () {
        table.search(this.value).draw();
    });

    $('#cboMostrar').on('change', function () {

        table.page.len($("#cboMostrar").val()).draw();
    });

    $("#btnMostrarTodo").on('click', function () {
        if (this.innerText == "Mostrar Ampliado") {
            this.innerText = "Mostrar Recomendado";
            table.page.len(100).draw();

        }
        else {
            this.innerText = "Mostrar Ampliado";
            table.page.len(10).draw();
        }
    });
}

/*****************boton top***********************************/
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        $("#btnTop").show();
    } else {
         $("#btnTop").hide();
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

/***********************************************************************************************/
