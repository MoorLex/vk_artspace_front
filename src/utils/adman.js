import profile from '../store/profile'

export default function (params = {}) {
  return new Promise((resolve, reject) => {
    function onAdsReady(adman) {
      if (params.onStarted) {
        adman.onStarted(params.onStarted);
      }

      if (params.onClicked) {
        adman.onClicked(params.onClicked);
      }

      adman.onCompleted(() => resolve({ type: 'onCompleted' }));
      adman.onSkipped(() => resolve({ type: 'onSkipped' }));
      adman.start('preroll');
    }

    admanInit({
      user_id: profile.id,
      app_id: 7588282,
      mobile: true,
      type: 'rewarded'
    }, onAdsReady, reject)
  })
}
