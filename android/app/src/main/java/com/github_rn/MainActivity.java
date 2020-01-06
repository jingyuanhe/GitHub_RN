package com.github_rn;

import com.facebook.react.ReactActivity;
import com.umeng.analytics.MobclickAgent;
import android.os.Bundle;
public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Github_RN";
  }
  @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //以及发送间隔
        MobclickAgent.setSessionContinueMillis(1000);
        //统计的场景
       // MobclickAgent.setScenarioType(this,MobclickAgent.EScenarioType.E_DUM_NORMAL);
  }
  public void onResume() {
      super.onResume();
      MobclickAgent.onResume(this);
  }
  public void onPause() {
      super.onPause();
      MobclickAgent.onPause(this);
  }
}
