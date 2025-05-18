import { Card, Typography  } from "@material-tailwind/react"

type LayoutProps = {
    title: string | React.ReactNode
    subtitle: string | React.ReactNode
    body: React.ReactNode
    footer: React.ReactNode
}

export const Layout = ({ title, subtitle, body, footer }: LayoutProps) => {
    return (
        <div className={'flex-grow overflow-auto'}>
            <form  className="mx-auto flex-grow flex flex-col items-center py-14 overflow-auto">
                <Card variant="outline" color="secondary" className="max-w-md mx-auto">
                    <Card.Header className="p-6 m-0 w-full text-center">
                        <Typography as="h2" type="h5" color="default" className="mb-2 mt-4">
                            {title}
                        </Typography>
                        <Typography className="text-foreground max-w-xs mx-auto">
                            {subtitle}
                        </Typography>
                    </Card.Header>
                    <Card.Body className="p-6 space-y-4">
                        {body}
                    </Card.Body>
                    <Card.Footer className="p-6 space-y-4">
                        {footer}
                    </Card.Footer>
                </Card>
            </form>
        </div>
    )
}