// カテゴリー
// 1: 未分類
// 28: キャンペーン
// 29: クーポン
// 30: 配送遅延
// 31: 重要事項

// タグ
// 24: 公式オンライン
// 25: 楽天
// 26: ヤフーショッピング
// 27: au
// 32: 楽天ラクジュアリークーポン
// 33: オリコショッピングローン
// 34: ジャックスショッピングローン

///////////////////////////////////////////////

// カテゴリー本番
// 1: 未分類
// 13: キャンペーン
// 14: クーポン
// 15: 配送遅延
// 16: 大切なお知らせ

// タグ本番
// 17: au
// 18: オリコショッピングローン
// 19: ジャックスショッピングローン
// 20: ヤフーショッピング
// 22: 公式オンライン
// 23: 楽天
// 24: 楽天ラクジュアリークーポン



var news = document.querySelector('#news');
var html = '';

axios.get('https://YOUR.DOMAIN.com/wp-json/wp/v2/posts')
  .then(function(response) {
    var data = response.data;

    data.map(function(value) {
      console.log(value);

      // 投稿日付取得
      var date = value.date;
      var index = date.indexOf("T");
      date = date.slice(0, index);
      var index1 = date.indexOf("-");
      var index2 = date.lastIndexOf("-");
      var year = date.substring(0, index1);
      var month = date.substring(5, index2);
      var day = date.slice(-2);
      var datestr = year + "年" + month + "月" + day + "日";

      // url(カスタムフィールド)取得
      var rakuten_coupon = htmlspecialchars(value['rakuten-coupon']);
      var rakuten_jaccs = htmlspecialchars(value['rakuten-jaccs']);
      var rakuten_orico = htmlspecialchars(value['rakuten-orico']);
      var makeshop_jaccs = htmlspecialchars(value['makeshop-jaccs']);
      var makeshop_orico = htmlspecialchars(value['makeshop-orico']);
      var wowma_jaccs = htmlspecialchars(value['wowma-jaccs']);
      var wowma_orico = htmlspecialchars(value['wowma-orico']);
      var link_url = htmlspecialchars(value.url);
      var yamato = htmlspecialchars(value.yamato);
      var sagawa = htmlspecialchars(value.sagawa);

      // 本文取得
      var contents = value.content.rendered;

      // カテゴリー取得
      var cat = value.categories
      var iconHTML = "";
      var catName = "";

      cat.map(function(category) {

        switch(category) {
          case 13:
            iconHTML = '<dt>' + datestr + '<span class="promotion">キャンペーン</span></dt>';
            catName = 'campaign';
            break;
          case 14:
            iconHTML = '<dt>' +datestr + '<span class="promotion">クーポン</span></dt>';
            catName = 'coupon';
            break;
          case 15:
            iconHTML = '<dt>' + datestr + '<span class="delivery">配送遅延</span></dt>';
            catName = 'delivery';
            break;
          case 16:
            iconHTML = '<dt>' + datestr + '<span class="important">大切なお知らせ</span></dt>';
            catName = 'important';
            break;
          default:
            iconHTML = '<dt>' + datestr + '</dt>';
            break;
        }
      });


      // タグ
      var tag = value.tags;
      // console.log(tag);

      var url = "";
      var flag = false;

      tag.map(function(tagcode) {

        /////////
        // 楽天 //
        ////////

        if(tagcode === 23) {

          if(catName === 'coupon') { // カテゴリーにクーポンが選択されていたら

            if(rakuten_coupon !== "") { // カスタムフィールドにurlが記入されていたら
              flag = true;
              url = rakuten_coupon;
            }
          }

          if(catName === 'campaign') { // カテゴリーにキャンペーンが選択されていたら

            if(rakuten_jaccs !== "") { // カスタムフィールドにurlが記入されていたら
              flag = true;
              url = rakuten_jaccs;
            }

            if(rakuten_orico !== "") { // カスタムフィールドにurlが記入されていたら
              flag = true;
              url = rakuten_orico;
            }
          }

          if(catName === 'delivery') { // カテゴリーに配送遅延が選択されていたら

            if(yamato !== "") { // カスタムフィールドにurlが記入されていたら
              flag = true;
              url = yamato;
            }

            if(sagawa !== "") { // カスタムフィールドにurlが記入されていたら
              flag = true;
              url = sagawa;
            }
          }

          if(catName === '' || catName === 'important') { // カテゴリーに未分類が選択されていたら

            if(link_url !== "") { // カスタムフィールドにurlが記入されていたら
              flag = true;
              url = link_url;
            }
          }

          // HTMLを生成
          if(flag === true) {
            contents = '<dd><a href="' + url + '" target="_top">' + contents + '</a></dd>';
            html += '<dl>' + iconHTML;
            html += contents + '</dl>';
          } else {
            contents = '<dd>' + contents + '</dd>';
            html += '<dl>' + iconHTML;
            html += contents + '</dl>';
          }
        }

        /////////////////
        // メイクショップ //
        /////////////////

        // if(tagcode === 22) {

        //   if(catName === 'campaign') { // カテゴリーにキャンペーンが選択されていたら

        //     if(makeshop_jaccs !== "") { // カスタムフィールドにurlが記入されていたら
        //       flag = true;
        //       url = makeshop_jaccs;
        //     }

        //     if(makeshop_orico !== "") { // カスタムフィールドにurlが記入されていたら
        //       flag = true;
        //       url = makeshop_orico;
        //     }
        //   }

        //   if(catName === 'delivery') { // カテゴリーに配送遅延が選択されていたら

        //     if(yamato !== "") { // カスタムフィールドにurlが記入されていたら
        //       flag = true;
        //       url = yamato;
        //     }

        //     if(sagawa !== "") { // カスタムフィールドにurlが記入されていたら
        //       flag = true;
        //       url = sagawa;
        //     }
        //   }

        //   if(catName === '' || catName === 'important') { // カテゴリーに未分類が選択されていたら

        //     if(link_url !== "") { // カスタムフィールドにurlが記入されていたら
        //       flag = true;
        //       url = link_url;
        //     }
        //   }

        //   // HTMLを生成
        //   if(flag === true) {
        //     contents = '<dd><a href="' + url + '">' + contents + '</a></dd>';
        //     html += '<dl>' + iconHTML;
        //     html += contents + '</dl>';
        //   } else {
        //     contents = '<dd>' + contents + '</dd>';
        //     html += '<dl>' + iconHTML;
        //     html += contents + '</dl>';
        //   }
        // }


        /////////////////////
        // ヤフーショッピング //
        /////////////////////

        // if(tagcode === 20) {

        //   if(catName === 'campaign') { // カテゴリーにキャンペーンが選択されていたら

        //     if(makeshop_jaccs !== "") { // カスタムフィールドにurlが記入されていたら
        //       flag = true;
        //       url = makeshop_jaccs;
        //     }

        //     if(makeshop_orico !== "") { // カスタムフィールドにurlが記入されていたら
        //       flag = true;
        //       url = makeshop_orico;
        //     }
        //   }

        //   if(catName === 'delivery') { // カテゴリーに配送遅延が選択されていたら

        //     if(yamato !== "") { // カスタムフィールドにurlが記入されていたら
        //       flag = true;
        //       url = yamato;
        //     }

        //     if(sagawa !== "") { // カスタムフィールドにurlが記入されていたら
        //       flag = true;
        //       url = sagawa;
        //     }
        //   }

        //   if(catName === '' || catName === 'important') { // カテゴリーに未分類が選択されていたら

        //     if(link_url !== "") { // カスタムフィールドにurlが記入されていたら
        //       flag = true;
        //       url = link_url;
        //     }
        //   }

        //   if(flag === true) {
        //     contents = '<dd><a href="' + url + '">' + contents + '</a></dd>';
        //     html += '<dl>' + iconHTML;
        //     html += contents + '</dl>';
        //   } else {
        //     contents = '<dd>' + contents + '</dd>';
        //     html += '<dl>' + iconHTML;
        //     html += contents + '</dl>';
        //   }
        // }

        ////////////////////
        // au PAY マーケット //
        ////////////////////

        // if(tagcode === 17) {

        //   if(catName === 'campaign') { // カテゴリーにキャンペーンが選択されていたら

        //     if(wowma_jaccs !== "") { // カスタムフィールドにurlが記入されていたら
        //       flag = true;
        //       url = wowma_jaccs;
        //     }

        //     if(wowma_orico !== "") { // カスタムフィールドにurlが記入されていたら
        //       flag = true;
        //       url = wowma_orico;
        //     }
        //   }

        //   if(catName === 'delivery') { // カテゴリーに配送遅延が選択されていたら

        //     if(yamato !== "") { // カスタムフィールドにurlが記入されていたら
        //       flag = true;
        //       url = yamato;
        //     }

        //     if(sagawa !== "") { // カスタムフィールドにurlが記入されていたら
        //       flag = true;
        //       url = sagawa;
        //     }
        //   }

        //   if(catName === '' || catName === 'important') { // カテゴリーに未分類が選択されていたら

        //     if(link_url !== "") { // カスタムフィールドにurlが記入されていたら
        //       flag = true;
        //       url = link_url;
        //     }
        //   }

        //   if(flag === true) {
        //     contents = '<dd><a href="' + url + '">' + contents + '</a></dd>';
        //     html += '<dl>' + iconHTML;
        //     html += contents + '</dl>';
        //   } else {
        //     contents = '<dd>' + contents + '</dd>';
        //     html += '<dl>' + iconHTML;
        //     html += contents + '</dl>';
        //   }
        // }

      });

    });

    news.innerHTML = html;
  })
  .catch(function(error) {
    console.error(error);
  })
  .finally(function() {

  });

  // 特殊文字エスケープ用の関数
  function htmlspecialchars(unsafeText){
    if(typeof unsafeText !== 'string'){
      return unsafeText;
    }
    return unsafeText.replace(/[&'`"<>]/g, function(match) {
        return {
          '&': '&amp;',
          "'": '&#x27;',
          '`': '&#x60;',
          '"': '&quot;',
          '<': '&lt;',
          '>': '&gt;',
        }[match]
      }
    );
  }
