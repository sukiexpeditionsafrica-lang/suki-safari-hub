import 'package:flutter_test/flutter_test.dart';

import 'package:suki_safari_hub/main.dart';

void main() {
  testWidgets('Suki Safari Hub shell loads', (WidgetTester tester) async {
    await tester.pumpWidget(const SukiApp());
    await tester.pump();
    expect(find.text('Suki Safari Hub'), findsWidgets);
    expect(find.text('Calculator'), findsOneWidget);
    expect(find.text('Places'), findsOneWidget);
    expect(find.text('Guides'), findsOneWidget);
  });
}
