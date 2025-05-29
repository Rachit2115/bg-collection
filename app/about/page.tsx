import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">About BG Collection</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Curating exquisite home decor pieces that blend traditional craftsmanship with contemporary design since
            2015.
          </p>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <Badge className="mb-4">Our Story</Badge>
            <h2 className="text-3xl font-bold mb-6">Bringing Artisanal Elegance to Modern Homes</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                BG Collection was founded in 2015 by Bhavya Gupta with a vision to celebrate India's rich artistic
                heritage while creating contemporary home decor pieces that resonate with modern aesthetics.
              </p>
              <p>
                What began as a small workshop in Mumbai has now grown into a beloved brand known for its commitment to
                quality, craftsmanship, and sustainable practices.
              </p>
              <p>
                Each piece in our collection tells a story – of skilled artisans, traditional techniques passed down
                through generations, and our dedication to preserving these art forms while making them relevant for
                today's homes.
              </p>
            </div>
            <Button className="mt-6">Our Collections</Button>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/placeholder.svg?height=800&width=600"
              alt="BG Collection Workshop"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-4">Our Values</Badge>
            <h2 className="text-3xl font-bold mb-4">What Drives Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our core values shape everything we do – from how we source materials to how we treat our artisans and
              serve our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                  <path d="m14.5 9-5 5"></path>
                  <path d="m9.5 9 5 5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Craftsmanship</h3>
              <p className="text-muted-foreground">
                We believe in creating pieces that last for generations, using premium materials and meticulous
                attention to detail.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M3 6v18h18V6"></path>
                  <path d="M3 6V3h18v3"></path>
                  <path d="M3 6h18"></path>
                  <path d="M10 14h4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Sustainable Practices</h3>
              <p className="text-muted-foreground">
                We're committed to ethical sourcing, eco-friendly materials, and reducing our environmental footprint.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Artisan Support</h3>
              <p className="text-muted-foreground">
                We work directly with skilled artisans across India, ensuring fair wages and preserving traditional
                crafts.
              </p>
            </Card>
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-4">Our Team</Badge>
            <h2 className="text-3xl font-bold mb-4">Meet the People Behind BG Collection</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our diverse team brings together expertise in design, craftsmanship, and business to create a brand that
              celebrates artistry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Bhavya Gupta",
                role: "Founder & Creative Director",
                image: "/placeholder.svg?height=400&width=400",
                bio: "With a background in textile design and a passion for traditional crafts, Bhavya founded BG Collection to bridge the gap between artisanal techniques and contemporary aesthetics.",
              },
              {
                name: "Arjun Mehta",
                role: "Head of Design",
                image: "/placeholder.svg?height=400&width=400",
                bio: "Arjun brings over 15 years of experience in product design, with a special focus on blending functionality with artistic expression.",
              },
              {
                name: "Priya Sharma",
                role: "Artisan Relations",
                image: "/placeholder.svg?height=400&width=400",
                bio: "Priya works directly with our network of artisans across India, ensuring fair practices and helping preserve traditional craft techniques.",
              },
              {
                name: "Vikram Singh",
                role: "Operations Director",
                image: "/placeholder.svg?height=400&width=400",
                bio: "Vikram oversees our supply chain and operations, ensuring that each piece meets our quality standards before reaching your home.",
              },
            ].map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-square relative">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-sm text-primary mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it – here's what our customers have to say about their BG Collection
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Anjali Desai",
                location: "Mumbai",
                quote:
                  "The wall clock I purchased from BG Collection has become the centerpiece of my living room. The craftsmanship is exceptional, and it perfectly blends with my modern decor while adding a touch of traditional elegance.",
                rating: 5,
              },
              {
                name: "Rahul Kapoor",
                location: "Delhi",
                quote:
                  "I've been collecting photo frames from BG Collection for years now. Each piece tells a story and adds character to my home. The attention to detail and quality is unmatched.",
                rating: 5,
              },
              {
                name: "Meera Patel",
                location: "Bangalore",
                quote:
                  "The customer service at BG Collection is as impressive as their products. When I had an issue with my order, they resolved it promptly and went above and beyond to ensure my satisfaction.",
                rating: 4,
              },
              {
                name: "Karan Malhotra",
                location: "Chennai",
                quote:
                  "I gifted my mother a set of decorative items from BG Collection for her birthday, and she absolutely loved them. The packaging was beautiful, and the products exceeded my expectations.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="italic mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Our Journey */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-4">Our Journey</Badge>
            <h2 className="text-3xl font-bold mb-4">Milestones That Define Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From humble beginnings to becoming a recognized name in home decor, our journey has been one of passion
              and perseverance.
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                year: "2015",
                title: "The Beginning",
                description:
                  "BG Collection was founded in a small workshop in Mumbai with just three artisans and a vision to create beautiful home decor pieces.",
              },
              {
                year: "2017",
                title: "First Flagship Store",
                description:
                  "We opened our first physical store in Mumbai, showcasing our complete collection and allowing customers to experience our products firsthand.",
              },
              {
                year: "2019",
                title: "Artisan Partnership Program",
                description:
                  "We launched our Artisan Partnership Program, working directly with craftspeople across India to preserve traditional techniques and ensure fair wages.",
              },
              {
                year: "2021",
                title: "Sustainability Initiative",
                description:
                  "We committed to using sustainable materials and eco-friendly packaging across our entire product line, reducing our environmental footprint.",
              },
              {
                year: "2023",
                title: "National Expansion",
                description:
                  "BG Collection expanded to major cities across India with partner stores and an enhanced online presence, making our products accessible nationwide.",
              },
            ].map((milestone, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <div className="bg-primary/10 p-4 rounded-lg inline-block">
                    <span className="text-2xl font-bold text-primary">{milestone.year}</span>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Experience the BG Collection Difference</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Discover our curated collection of home decor pieces that blend artisanal craftsmanship with contemporary
            design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Shop Now</Button>
            <Button size="lg" variant="outline">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
