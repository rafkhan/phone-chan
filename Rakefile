APK = "PhoneChan-debug.apk"

namespace :b do
	task :d do
		`ant debug`
	end
	
	task :r do
		`ant release`
	end
end

namespace :i do
	task :d do
		`adb -d install ./bin/#{APK}`
	end

	task :r do
		`adb -d install -r ./bin/#{APK}`
	end
end

namespace :d do
	task :d do
		`ant debug`
		`adb -d install -r ./bin/#{APK}`
	end

	task :r do
		`ant release`
		`adb -d install -r ./bin/#{APK}`
	end
end
