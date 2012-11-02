package me.rafkhan.android.phonechan;

import org.apache.cordova.DroidGap;

import android.os.Bundle;

public class PhoneChan extends DroidGap {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
    }
}
