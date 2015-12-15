// Create content results data view
(function ($) {

  /**
   * @private
   */
  var createDataView = function (dataView, wrapper, loaded) {
    new H5PDataView(
      wrapper,
      dataView.source,
      dataView.headers,
      dataView.l10n,
      {
        table: 'wp-list-table widefat fixed'
      },
      dataView.filters,
      loaded,
      dataView.order
    );
  };

  /**
   * @private
   */
  var insertionDataView = function (id) {
    var $wrapper;
    $('#add-h5p').click(function () {
      // Open ThickBox
      tb_show($(this).attr('title'), '#TB_inline?inlineId=h5p-nope');
      $('#TB_window').addClass('h5p-insertion');

      if ($wrapper === undefined) {
        // Create new data view
        $wrapper = $('<div id="h5p-insert-content"/>').appendTo('#TB_ajaxContent');

        createDataView(H5PIntegration.dataViews[id], $wrapper.get(0), function () {
          // Data loaded
          $wrapper.find('.h5p-insert').click(function () {
            // Inserting content
            if ($('#insert-h5p-as').val()=='slug')
              send_to_editor('[h5p slug="' + $(this).data('slug') + '"]');

            else
              send_to_editor('[h5p id="' + $(this).data('id') + '"]');

            $wrapper.detach();
            $('#TB_window').removeClass('h5p-insertion');
            tb_remove();
          });

          // Append insert method selection
          if (!$('#insert-h5p-as').length) {
            var methodHtml=
              '<div style="position: absolute; top: 0; right: 0; margin: 0.5em">'+
              '<select id="insert-h5p-as">'+
              '<option value="id">Insert using id</option>'+
              '<option value="slug">Insert using slug</option>'+
              '</select>'+
              '</div>';
            $('#h5p-insert-content').append(methodHtml);
          }
        });
      }
      else {
        // Append existing data view
        $wrapper.appendTo('#TB_ajaxContent');
      }

      return false;
    });
  };

  $(document).ready(function () {
    for (var id in H5PIntegration.dataViews) {
      if (!H5PIntegration.dataViews.hasOwnProperty(id)) {
        continue;
      }
      if (id === 'h5p-insert-content') {
        insertionDataView(id);
        continue;
      }

      var wrapper = $('#' + id).get(0);
      if (wrapper !== undefined) {
        createDataView(H5PIntegration.dataViews[id], wrapper);
      }
    }
  });
})(H5P.jQuery);
