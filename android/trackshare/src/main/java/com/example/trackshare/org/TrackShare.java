package com.example.trackshare.org;

import android.annotation.TargetApi;
import android.content.Context;
import android.os.Build;
import android.provider.SyncStateContract;

import com.umeng.commonsdk.BuildConfig;
import com.umeng.commonsdk.UMConfigure;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
public class TrackShare {
    /**
     * 注意: 即使您已经在AndroidManifest.xml中配置过appkey和channel值，
     * 也需要在App代码中调用初始化接口（如需要使用AndroidManifest.xml中配置好的appkey和channel值，UMConfigure
     * .init调用中appkey和channel参数请置为null）。
     *
     * @param context
     */
    public static void init(Context context) {
        initRN("react-native", "1.0");
        //接口一共五个参数，其中第一个参数为Context，第二个参数为友盟Appkey，第三个参数为channel，第四个参数为应用类型（手机或平板），第五个参数为push的secret（如果没有使用push，可以为空）
        UMConfigure.init(context, "5e129a8fcb23d2b684000af9", "official", UMConfigure.DEVICE_TYPE_PHONE, null);
        UMConfigure.setLogEnabled(BuildConfig.DEBUG);
    }

    @TargetApi(Build.VERSION_CODES.KITKAT)
    private static void initRN(String v, String t) {
        Method method = null;
        try {
            Class<?> config = Class.forName("com.umeng.commonsdk.UMConfigure");
            method = config.getDeclaredMethod("setWraperType", String.class, String.class);
            method.setAccessible(true);
            method.invoke(null, v, t);
        } catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
