import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import Icon from '@/components/ui/icon';
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const galleryImages = [
  'https://picsum.photos/seed/pom1/600/600',
  'https://picsum.photos/seed/pom2/600/600',
  'https://picsum.photos/seed/pom3/600/600',
  'https://picsum.photos/seed/pom4/600/600',
  'https://picsum.photos/seed/pom5/600/600',
  'https://picsum.photos/seed/pom6/600/600',
  'https://picsum.photos/seed/pom7/600/600',
  'https://picsum.photos/seed/pom8/600/600'
];

const products: Product[] = [
  {
    id: 1,
    name: "Косточка из оленины",
    price: 450,
    description: "100% натуральная оленина, идеальна для крупных пород",
    category: "Мясные лакомства",
    image: "🦴"
  },
  {
    id: 2,
    name: "Куриные чипсы",
    price: 320,
    description: "Хрустящие чипсы из куриной грудки, богатые белком",
    category: "Сушеные лакомства",
    image: "🍗"
  },
  {
    id: 3,
    name: "Дентал стикс",
    price: 280,
    description: "Для здоровья зубов и свежести дыхания",
    category: "Уход за зубами",
    image: "🦷"
  },
  {
    id: 4,
    name: "Вяленая говядина",
    price: 520,
    description: "Премиум говядина долгой вялки",
    category: "Мясные лакомства",
    image: "🥩"
  },
  {
    id: 5,
    name: "Утиные твистеры",
    price: 380,
    description: "Закрученные полоски из утиного мяса",
    category: "Сушеные лакомства",
    image: "🦆"
  },
  {
    id: 6,
    name: "Лакомство с лососем",
    price: 490,
    description: "Омега-3 для блестящей шерсти",
    category: "Рыбные лакомства",
    image: "🐟"
  }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [city, setCity] = useState<string>('');
  const [deliveryCost, setDeliveryCost] = useState<number | null>(null);

  const openImage = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeImage = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const calculateDelivery = () => {
    if (!city.trim()) {
      toast.error('Введите название города');
      return;
    }
    const cities: Record<string, number> = {
      'москва': 200,
      'санкт-петербург': 250,
      'петербург': 250,
      'спб': 250,
      'екатеринбург': 300,
      'новосибирск': 350,
      'казань': 280,
      'нижний новгород': 270,
      'челябинск': 320,
      'самара': 290,
      'омск': 360,
      'ростов-на-дону': 310,
      'уфа': 330,
      'красноярск': 400,
      'воронеж': 280,
      'пермь': 340,
      'волгоград': 300
    };
    const cityLower = city.toLowerCase().trim();
    const cost = cities[cityLower] || 350;
    setDeliveryCost(cost);
    toast.success(`Стоимость доставки в ${city}: ${cost} ₽`);
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} добавлено в корзину!`);
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🐾</span>
            <span className="text-2xl font-bold text-primary">ЛапкиЛакомки</span>
          </div>
          
          <nav className="hidden md:flex gap-6">
            <button onClick={() => scrollToSection('home')} className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'home' ? 'text-primary' : 'text-foreground'}`}>
              Главная
            </button>
            <button onClick={() => scrollToSection('catalog')} className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'catalog' ? 'text-primary' : 'text-foreground'}`}>
              Каталог
            </button>
            <button onClick={() => scrollToSection('about')} className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'about' ? 'text-primary' : 'text-foreground'}`}>
              О нас
            </button>
            <button onClick={() => scrollToSection('delivery')} className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'delivery' ? 'text-primary' : 'text-foreground'}`}>
              Доставка
            </button>
            <button onClick={() => scrollToSection('gallery')} className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'gallery' ? 'text-primary' : 'text-foreground'}`}>
              Фото
            </button>
            <button onClick={() => scrollToSection('contacts')} className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'contacts' ? 'text-primary' : 'text-foreground'}`}>
              Контакты
            </button>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground">Корзина пуста</p>
                ) : (
                  <>
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                        <div className="text-4xl">{item.image}</div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Icon name="Minus" size={12} />
                            </Button>
                            <span className="text-sm">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Icon name="Plus" size={12} />
                            </Button>
                          </div>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    ))}
                    <Separator />
                    <div className="space-y-4 pt-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Итого:</span>
                        <span>{getTotalPrice()} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main>
        <section id="home" className="py-20 md:py-32">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  Вкусные лакомства для ваших любимцев
                </h1>
                <p className="text-xl text-muted-foreground">
                  100% натуральные угощения, которые принесут радость вашей собаке
                </p>
                <div className="flex gap-4">
                  <Button size="lg" onClick={() => scrollToSection('catalog')}>
                    <Icon name="ShoppingBag" size={20} className="mr-2" />
                    Перейти в каталог
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => scrollToSection('about')}>
                    Узнать больше
                  </Button>
                </div>
                <div className="flex gap-8 pt-4">
                  <div>
                    <div className="text-3xl font-bold text-primary">100%</div>
                    <div className="text-sm text-muted-foreground">Натуральные</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">50+</div>
                    <div className="text-sm text-muted-foreground">Видов лакомств</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">5000+</div>
                    <div className="text-sm text-muted-foreground">Довольных собак</div>
                  </div>
                </div>
              </div>
              <div className="relative animate-scale-in">
                <div className="w-full aspect-square rounded-3xl shadow-2xl bg-gradient-to-br from-orange-200 via-orange-300 to-amber-200 flex items-center justify-center">
                  <div className="text-[180px] leading-none">🐕</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="catalog" className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Популярные лакомства</h2>
              <p className="text-xl text-muted-foreground">Выбирайте лучшее для своего питомца</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden hover-scale transition-all">
                  <CardHeader className="bg-gradient-to-br from-secondary to-accent">
                    <div className="text-7xl text-center py-6">{product.image}</div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Badge className="mb-2">{product.category}</Badge>
                    <CardTitle className="mb-2">{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                    <div className="text-2xl font-bold text-primary">{product.price} ₽</div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => addToCart(product)}>
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="w-full aspect-square rounded-3xl shadow-xl bg-gradient-to-br from-pink-200 via-rose-200 to-red-200 flex items-center justify-center">
                <div className="text-[120px] leading-none">❤️</div>
              </div>
              <div className="space-y-6">
                <h2 className="text-4xl font-bold">О нас</h2>
                <p className="text-lg text-muted-foreground">
                  Мы — команда профессионалов, которые любят собак так же сильно, как и вы. Уже более 10 лет мы производим натуральные лакомства без искусственных добавок, консервантов и красителей.
                </p>
                <p className="text-lg text-muted-foreground">
                  Каждый продукт проходит строгий контроль качества. Мы работаем только с проверенными поставщиками мяса и используем щадящие технологии обработки, сохраняющие все полезные свойства.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle" size={24} className="text-primary" />
                    <div>
                      <div className="font-semibold">Без химии</div>
                      <div className="text-sm text-muted-foreground">100% натуральный состав</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle" size={24} className="text-primary" />
                    <div>
                      <div className="font-semibold">Свежее</div>
                      <div className="text-sm text-muted-foreground">Производим еженедельно</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle" size={24} className="text-primary" />
                    <div>
                      <div className="font-semibold">Безопасно</div>
                      <div className="text-sm text-muted-foreground">Ветеринарный контроль</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle" size={24} className="text-primary" />
                    <div>
                      <div className="font-semibold">Вкусно</div>
                      <div className="text-sm text-muted-foreground">Собаки в восторге</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="delivery" className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Доставка</h2>
              <p className="text-xl text-muted-foreground">Быстро и удобно до вашей двери</p>
            </div>
            <div className="max-w-xl mx-auto mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Рассчитать доставку</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <Input 
                      placeholder="Введите ваш город"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && calculateDelivery()}
                      className="flex-1"
                    />
                    <Button onClick={calculateDelivery}>
                      <Icon name="Calculator" size={16} className="mr-2" />
                      Рассчитать
                    </Button>
                  </div>
                  {deliveryCost !== null && (
                    <div className="mt-4 p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-1">Стоимость доставки</p>
                      <p className="text-3xl font-bold text-primary">{deliveryCost} ₽</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="overflow-hidden">
                <CardHeader>
                  <div className="w-full h-32 bg-gradient-to-br from-blue-200 to-cyan-200 flex items-center justify-center mb-4 rounded-lg">
                    <div className="text-6xl">🚚</div>
                  </div>
                  <CardTitle className="text-center">СДЭК</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">Доставка в пункты выдачи и курьером по всей России. Срок 2-7 дней.</p>
                  <div className="mt-4 text-center">
                    <div className="text-2xl font-bold text-primary">от 200 ₽</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardHeader>
                  <div className="w-full h-32 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center mb-4 rounded-lg">
                    <div className="text-6xl">📦</div>
                  </div>
                  <CardTitle className="text-center">Почта России</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">Отправка в любую точку России. Срок доставки 5-14 дней в зависимости от региона.</p>
                  <div className="mt-4 text-center">
                    <div className="text-2xl font-bold text-primary">от 350 ₽</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardHeader>
                  <div className="w-full h-32 bg-gradient-to-br from-green-200 to-emerald-200 flex items-center justify-center mb-4 rounded-lg">
                    <div className="text-6xl">🏪</div>
                  </div>
                  <CardTitle className="text-center">Самовывоз</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">Забирайте заказ из нашего магазина на следующий день после оформления.</p>
                  <div className="mt-4 text-center">
                    <div className="text-2xl font-bold text-primary">Бесплатно</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="gallery" className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Наши счастливые клиенты</h2>
              <p className="text-xl text-muted-foreground">Шпицы обожают наши лакомства!</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((img, index) => {
                const gradients = [
                  'from-orange-300 to-amber-300',
                  'from-pink-300 to-rose-300',
                  'from-blue-300 to-cyan-300',
                  'from-purple-300 to-pink-300',
                  'from-green-300 to-emerald-300',
                  'from-yellow-300 to-orange-300',
                  'from-red-300 to-pink-300',
                  'from-indigo-300 to-purple-300'
                ];
                const emojis = ['🐕', '🐶', '🦴', '❤️', '⭐', '🎾', '🏆', '🎉'];
                return (
                  <div 
                    key={index}
                    className={`relative overflow-hidden rounded-2xl aspect-square group cursor-pointer bg-gradient-to-br ${gradients[index]} flex items-center justify-center transition-transform duration-300 hover:scale-105`}
                    onClick={() => openImage(index)}
                  >
                    <div className="text-8xl">{emojis[index]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contacts" className="py-20">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Контакты</h2>
                <p className="text-xl text-muted-foreground">Мы всегда рады помочь вам</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Icon name="Phone" size={24} className="text-primary" />
                      <CardTitle>Телефон</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg">+7 (495) 123-45-67</p>
                    <p className="text-sm text-muted-foreground mt-1">Ежедневно с 9:00 до 21:00</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Icon name="Mail" size={24} className="text-primary" />
                      <CardTitle>Email</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg">info@lapkilakomki.ru</p>
                    <p className="text-sm text-muted-foreground mt-1">Ответим в течение 24 часов</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Icon name="MapPin" size={24} className="text-primary" />
                      <CardTitle>Адрес</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg">Москва, ул. Примерная, 15</p>
                    <p className="text-sm text-muted-foreground mt-1">Магазин и пункт самовывоза</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Icon name="MessageCircle" size={24} className="text-primary" />
                      <CardTitle>Соцсети</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg">@lapkilakomki</p>
                    <p className="text-sm text-muted-foreground mt-1">Мы в Instagram и Telegram</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-muted/30">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🐾</span>
              <span className="text-xl font-bold text-primary">ЛапкиЛакомки</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 ЛапкиЛакомки. Все права защищены.</p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="MessageCircle" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Mail" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>

      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeImage}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
            onClick={closeImage}
          >
            <Icon name="X" size={24} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10 h-12 w-12"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <Icon name="ChevronLeft" size={32} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10 h-12 w-12"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <Icon name="ChevronRight" size={32} />
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {selectedImageIndex + 1} / {galleryImages.length}
          </div>
          
          <div className="max-w-2xl max-h-[80vh] aspect-square bg-gradient-to-br from-orange-300 via-pink-300 to-purple-300 rounded-lg flex items-center justify-center">
            <div className="text-[200px] leading-none">
              {['🐕', '🐶', '🦴', '❤️', '⭐', '🎾', '🏆', '🎉'][selectedImageIndex]}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}