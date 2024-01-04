import sql from 'better-sqlite3';
import { S3 } from '@aws-sdk/client-s3';
import slugify from "slugify";
import xss from "xss";
import fs from 'node:fs';
import { v4 as uuidv4 } from 'uuid';

const s3 = new S3({
    region: 'eu-central-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const db = sql('meals.db');

export function getMeals() {
    return db.prepare('SELECT * FROM meals').all();
}
export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
    //Create a slug and sanitize User Input for XSS Protection
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    // Append a unique identifier to the slug to make it unique
    const uniqueIdentifier = uuidv4().split('-')[0];
    meal.slug = `${meal.slug}-${uniqueIdentifier}`;

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    //await saveImageIntoImagesFolder(fileName, meal);
    await saveImageInS3Bucket(meal, fileName);

    //Store uploaded images and store data in the database
    meal.image = fileName;

    db.prepare(
        `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
    ).run(meal);
}

async function saveImageIntoImagesFolder(fileName, meal) {
    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Saving image failed!');
        }
    });
}

async function saveImageInS3Bucket(meal, fileName) {
    const bufferedImage = await meal.image.arrayBuffer();

    s3.putObject({
        Bucket: 'williamsteinke-nextjs-nextfoodlevel',
        Key: fileName,
        Body: Buffer.from(bufferedImage),
        ContentType: meal.image.type,
    })
}

