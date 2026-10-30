import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'package:supabase_flutter/supabase_flutter.dart';
import 'supabase_config.dart';

// Suki Safari Hub, by Suki Expeditions Africa.
// MVP shell, step by step. No payments, no escrow, no permit or visa
// issuing, no real guide bookings. The calculator is an estimate, not a
// quote. Fees must be rechecked on official portals before quoting.
// Money path, planned only: the free cost and paperwork calculator brings
// travellers in; later, verified bookings can earn a small traveller fee,
// a supplier verification subscription, and a commission lower than the
// 15-30% agents and OTAs usually take. None of that is live in this shell.

void main() {
  runApp(const SukiApp());
}

class Place {
  final String country;
  final String name;
  final String type;
  final String famousFor;
  final String feeNote;
  const Place({
    required this.country,
    required this.name,
    required this.type,
    required this.famousFor,
    required this.feeNote,
  });

  factory Place.fromJson(Map<String, dynamic> json) => Place(
        country: json['country'] as String,
        name: json['name'] as String,
        type: json['type'] as String,
        famousFor: json['famous_for'] as String,
        feeNote: json['fee_note'] as String,
      );

  // Fixed permit figures carried over from the web calculator, v3.
  int get permit {
    if (name == 'Bwindi Impenetrable National Park') return 800;
    if (name == 'Mgahinga Gorilla National Park') return 800;
    if (name == 'Volcanoes National Park') return 1500;
    return 0;
  }
}

class SukiApp extends StatelessWidget {
  const SukiApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Suki Safari Hub',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF7A5A12)),
        useMaterial3: true,
      ),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _tab = 0;
  List<Place> _places = [];
  String _loadError = '';

  @override
  void initState() {
    super.initState();
    _loadPlaces();
  }

  Future<void> _loadPlaces() async {
    try {
      if (supabaseConfigured) {
        await Supabase.initialize(url: supabaseUrl, publishableKey: supabaseAnonKey);
        final rows = await Supabase.instance.client
            .from('places')
            .select()
            .order('country')
            .order('name');
        final list = rows as List;
        setState(() {
          _places = list
              .map((e) => Place.fromJson(e as Map<String, dynamic>))
              .toList();
        });
        return;
      }
      final raw = await rootBundle.loadString('assets/attractions.json');
      final list = jsonDecode(raw) as List;
      setState(() {
        _places = list
            .map((e) => Place.fromJson(e as Map<String, dynamic>))
            .toList();
      });
    } catch (e) {
      setState(() => _loadError = 'Places could not be loaded: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final pages = [
      CalculatorPage(places: _places, loadError: _loadError),
      PlacesPage(places: _places, loadError: _loadError),
      const GuidesPage(),
    ];
    return Scaffold(
      appBar: AppBar(
        title: const Text('Suki Safari Hub'),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(22),
          child: Container(
            alignment: Alignment.centerLeft,
            padding: const EdgeInsets.only(left: 16, bottom: 8),
            child: const Text(
              'By Suki Expeditions Africa',
              style: TextStyle(fontSize: 13),
            ),
          ),
        ),
      ),
      body: pages[_tab],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _tab,
        onDestinationSelected: (i) => setState(() => _tab = i),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.calculate), label: 'Calculator'),
          NavigationDestination(icon: Icon(Icons.map), label: 'Places'),
          NavigationDestination(icon: Icon(Icons.person), label: 'Guides'),
        ],
      ),
    );
  }
}

const Map<String, List<List<int>>> stayBands = {
  'Uganda': [
    [30, 100],
    [100, 350],
    [350, 1200],
  ],
  'Kenya': [
    [80, 150],
    [200, 400],
    [500, 1000],
  ],
  'Tanzania': [
    [100, 200],
    [230, 800],
    [600, 1500],
  ],
  'Rwanda': [
    [50, 120],
    [150, 400],
    [500, 1500],
  ],
};
const List<String> stayTierNames = ['Budget', 'Mid-range', 'Luxury'];

class CalculatorPage extends StatefulWidget {
  final List<Place> places;
  final String loadError;
  const CalculatorPage({super.key, required this.places, required this.loadError});

  @override
  State<CalculatorPage> createState() => _CalculatorPageState();
}

class _CalculatorPageState extends State<CalculatorPage> {
  Place? _place;
  final _people = TextEditingController(text: '2');
  final _days = TextEditingController(text: '5');
  final _park = TextEditingController(text: '70');
  final _stay = TextEditingController(text: '150');
  final _guide = TextEditingController(text: '200');
  final _transport = TextEditingController(text: '300');
  String _result = '';

  @override
  void dispose() {
    _people.dispose();
    _days.dispose();
    _park.dispose();
    _stay.dispose();
    _guide.dispose();
    _transport.dispose();
    super.dispose();
  }

  double _num(TextEditingController c) => double.tryParse(c.text) ?? 0;

  void _calc() {
    final p = _place;
    if (p == null) return;
    final people = _num(_people);
    final days = _num(_days);
    final permitTotal = p.permit * people;
    final parkTotal = _num(_park) * days * people;
    final stayTotal = _num(_stay) * days * people;
    final guideTotal = _num(_guide) * days;
    final transport = _num(_transport);
    final tips = 25 * days * people;
    final total = permitTotal + parkTotal + stayTotal + guideTotal + transport + tips;
    setState(() {
      _result = 'Permits: \$${permitTotal.toStringAsFixed(0)}\n'
          'Park or entry fees: \$${parkTotal.toStringAsFixed(0)}\n'
          'Accommodation: \$${stayTotal.toStringAsFixed(0)}\n'
          'Guide and vehicle: \$${guideTotal.toStringAsFixed(0)}\n'
          'Transport: \$${transport.toStringAsFixed(0)}\n'
          'Guide tips allowance: \$${tips.toStringAsFixed(0)}\n'
          'Total estimate: \$${total.toStringAsFixed(0)}\n'
          'Per person: \$${people > 0 ? (total / people).round() : 0}';
    });
  }

  @override
  Widget build(BuildContext context) {
    if (widget.loadError.isNotEmpty) {
      return Center(child: Padding(padding: const EdgeInsets.all(16), child: Text(widget.loadError)));
    }
    if (widget.places.isEmpty) {
      return const Center(child: CircularProgressIndicator());
    }
    _place ??= widget.places.first;
    final bands = stayBands[_place!.country] ?? stayBands['Uganda']!;
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        const Text(
          'Safari cost and paperwork calculator. This is an estimate, not a quote and not an official fee list. Recheck park, visa and permit fees on official portals before booking.',
        ),
        const SizedBox(height: 12),
        DropdownButtonFormField<Place>(
          initialValue: _place,
          isExpanded: true,
          decoration: const InputDecoration(labelText: 'Choose a famous park, zoo or attraction'),
          items: widget.places.map((p) {
            final permitText = p.permit > 0 ? ' - permit \$${p.permit}' : '';
            return DropdownMenuItem(
              value: p,
              child: Text('${p.country}, ${p.name} (${p.type})$permitText'),
            );
          }).toList(),
          onChanged: (p) => setState(() => _place = p),
        ),
        const SizedBox(height: 12),
        const Text(
          'Stays near this destination. SAMPLE, NOT VERIFIED. Planning ranges only, not lodge quotes. Confirm the live rate, board basis and inclusions with the lodge before booking.',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 8),
        ...List.generate(3, (i) {
          final band = bands[i];
          final mid = ((band[0] + band[1]) / 2).round();
          return ListTile(
            title: Text('${stayTierNames[i]}: SAMPLE \$${band[0]} to \$${band[1]} per person per night'),
            trailing: TextButton(
              onPressed: () {
                _stay.text = '$mid';
                _calc();
              },
              child: Text('Use \$$mid'),
            ),
          );
        }),
        _field('Travellers', _people),
        _field('Trip days', _days),
        _field('Park or entry fee per person per day (USD, editable)', _park),
        _field('Accommodation per person per night (USD)', _stay),
        _field('Guide and vehicle per day for the whole group (USD)', _guide),
        _field('Transport total for the group (USD)', _transport),
        const SizedBox(height: 12),
        ElevatedButton(onPressed: _calc, child: const Text('Calculate estimate')),
        if (_result.isNotEmpty) ...[
          const SizedBox(height: 16),
          Text(_result, style: const TextStyle(fontSize: 16)),
          const SizedBox(height: 8),
          Text(
            _place!.country == 'Tanzania'
                ? 'Paperwork: Tanzania e-visa, separate from the East African Tourist Visa. The \$100 East African Tourist Visa covers Kenya, Uganda and Rwanda only, not Tanzania.'
                : 'Paperwork: Check the East African Tourist Visa (\$100, Kenya, Uganda and Rwanda) or the single country eTA or visa for your entry country, on the official immigration portal.',
          ),
        ],
        const SizedBox(height: 16),
        Text('Fee note for ${_place!.name}: ${_place!.feeNote}'),
      ],
    );
  }

  Widget _field(String label, TextEditingController controller) {
    return Padding(
      padding: const EdgeInsets.only(top: 10),
      child: TextField(
        controller: controller,
        keyboardType: TextInputType.number,
        decoration: InputDecoration(labelText: label, border: const OutlineInputBorder()),
      ),
    );
  }
}

class PlacesPage extends StatelessWidget {
  final List<Place> places;
  final String loadError;
  const PlacesPage({super.key, required this.places, required this.loadError});

  @override
  Widget build(BuildContext context) {
    if (loadError.isNotEmpty) {
      return Center(child: Padding(padding: const EdgeInsets.all(16), child: Text(loadError)));
    }
    if (places.isEmpty) return const Center(child: CircularProgressIndicator());
    return ListView.builder(
      itemCount: places.length,
      itemBuilder: (context, i) {
        final p = places[i];
        return ListTile(
          title: Text('${p.country}, ${p.name}'),
          subtitle: Text('${p.type}. ${p.famousFor}\n${p.feeNote}'),
          isThreeLine: true,
        );
      },
    );
  }
}

class GuidesPage extends StatelessWidget {
  const GuidesPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Verified guides and drivers',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 12),
          Text(
            'SAMPLE STRUCTURE ONLY. No real guides are listed here, no profile is verified, and no guide can be booked or charged from this shell. A verified badge will only be shown when a licence is checked against a registry. Suki\'s own guides will use exactly the same rules.',
          ),
          SizedBox(height: 12),
          Text(
            'How this makes money later, planned only: the free calculator brings travellers in. When verified bookings open, Suki Safari Hub can earn a small traveller fee, a supplier verification subscription, and a commission lower than the 15 to 30 percent agents and OTAs usually take. Payments will be held by a licensed partner and released in stages, never held by Suki itself. None of that is live in this shell.',
          ),
        ],
      ),
    );
  }
}
